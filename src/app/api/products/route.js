import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import path from 'path';
import fs from 'fs';
import os from 'os'
import { uploadToCloudinary } from "@/lib/cloudinary/cloudinary";

export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find({
      isActive: true,
    }).sort({ createdAt: -1 });

    return Response.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET products error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}

// export async function POST(request) {
//   try {
//     await dbConnect();

//     const body = await request.json();

//     const {
//       name,
//       slug,
//       description,
//       brand,
//       category,
//       price,
//       discountPrice,
//       stock,
//       images,
//       specifications,
//       featured,
//     } = body;

//     // Basic validation
//     if (
//       !name ||
//       !slug ||
//       !description ||
//       !brand ||
//       !category ||
//       price === undefined
//     ) {
//       return Response.json(
//         {
//           success: false,
//           message: "Please provide all required fields",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     // Check duplicate slug
//     const existingProduct = await Product.findOne({ slug });

//     if (existingProduct) {
//       return Response.json(
//         {
//           success: false,
//           message: "A product with this slug already exists",
//         },
//         {
//           status: 409,
//         }
//       );
//     }

//     const product = await Product.create({
//       name,
//       slug,
//       description,
//       brand,
//       category,
//       price,
//       discountPrice,
//       stock,
//       images: "This is image string",
//       specifications,
//       featured,
//     });

//     return Response.json(
//       {
//         success: true,
//         message: "Product created successfully",
//         product,
//       },
//       {
//         status: 201,
//       }
//     );
//   } catch (error) {
//     console.error("POST product error:", error);

//     return Response.json(
//       {
//         success: false,
//         message: "Failed to create product",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }


export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.formData();

    const name = formData.get("name");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const brand = formData.get("brand");
    const category = formData.get("category");

    const price = formData.get("price");
    const discountPrice = formData.get("discountPrice");
    const stock = formData.get("stock");

    const featured =
      formData.get("featured") === "true";

    const isActive =
      formData.get("isActive") !== "false";

    // Specifications
    const specifications = {
      movement: formData.get("movement") || "",
      caseMaterial:
        formData.get("caseMaterial") || "",
      strapMaterial:
        formData.get("strapMaterial") || "",
      dialColor:
        formData.get("dialColor") || "",
      waterResistance:
        formData.get("waterResistance") || "",
      warranty:
        formData.get("warranty") || "",
    };

    // Images
    const imageFiles = formData.getAll("images");

    const imagesUrls = [];

    const uploadDir = path.join(os.tmpdir(), "uploads");

    if(!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {recursive : true})
    }

      // Check duplicate slug
      const existingProduct =
        await Product.findOne({
          slug: slug.toLowerCase(),
        });

          if (existingProduct) {
        return Response.json(
          {
            success: false,
            message:
              "A product with this slug already exists",
          },
          {
            status: 409,
          }
        );
      }

        

    for (const file of imageFiles) {
      if (!file || typeof file === "string") {
        continue;
      }
    
       const fileName = `${Date.now()}-${file.name}`;

      const filePath = path.join(uploadDir,fileName);

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      fs.writeFileSync(filePath,buffer);

      // console.log(buffer);
      const res = await uploadToCloudinary(filePath);
      
      imagesUrls.push(res);

    }

    // console.log("This is from imageUrls = ", imagesUrls);
      

      // Basic validation
      if (
        !name ||
        !slug ||
        !description ||
        !brand ||
        !category ||
        price === null ||
        stock === null
      ) {
        return Response.json(
          {
            success: false,
            message:
              "Please provide all required fields",
          },
          {
            status: 400,
          }
        );
      }

      // Validate category
      const allowedCategories = [
        "Men",
        "Women",
        "Luxury",
        "Smart",
      ];

      if (!allowedCategories.includes(category)) {
        return Response.json(
          {
            success: false,
            message: "Invalid category",
          },
          {
            status: 400,
          }
        );
      }

      // Validate price
      const numericPrice = Number(price);

      if (
        Number.isNaN(numericPrice) ||
        numericPrice < 0
      ) {
        return Response.json(
          {
            success: false,
            message: "Invalid price",
          },
          {
            status: 400,
          }
        );
      }

      // Validate stock
      const numericStock = Number(stock);

      if (
        Number.isNaN(numericStock) ||
        numericStock < 0
      ) {
        return Response.json(
          {
            success: false,
            message: "Invalid stock",
          },
          {
            status: 400,
          }
        );
      }

      // Validate discount
      let numericDiscountPrice = null;

      if (
        discountPrice !== null &&
        discountPrice !== ""
      ) {
        numericDiscountPrice =
          Number(discountPrice);

        if (
          Number.isNaN(numericDiscountPrice) ||
          numericDiscountPrice < 0
        ) {
          return Response.json(
            {
              success: false,
              message:
                "Invalid discount price",
            },
            {
              status: 400,
            }
          );
        }

        if (
          numericDiscountPrice > numericPrice
        ) {
          return Response.json(
            {
              success: false,
              message:
                "Discount price cannot be greater than regular price",
            },
            {
              status: 400,
            }
          );
        }
      }

      // Validate images
      const validImages = imageFiles.filter(
        (image) => image instanceof File
      );

      if (validImages.length === 0) {
        return Response.json(
          {
            success: false,
            message:
              "Please select at least one image",
          },
          {
            status: 400,
          }
        );
      }

      // Create product
      const product = await Product.create({
        name,
        slug: slug.toLowerCase(),
        description,
        brand,
        category,

        price: numericPrice,

        discountPrice:
          numericDiscountPrice,

        stock: numericStock,

        // Temporary
        images: imagesUrls,

        specifications,

        featured,

        isActive,
      });

      return Response.json(
        {
          success: true,
          message:
            "Product created successfully",
          // product,
        },
        {
          status: 201,
        }
      ); 

    } catch (error) {
      console.error(
        "POST product error:",
        error
      );

      return Response.json(
        {
          success: false,
          message:
            error.message ||
            "Failed to create product",
        },
        {
          status: 500,
        }
      );
    }
  }