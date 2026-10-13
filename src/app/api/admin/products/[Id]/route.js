import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";

// GET SINGLE PRODUCT
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { Id } = await params;
    console.log(Id);

    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return Response.json(
        {
          success: false,
          message: "InvalIdproduct ID",
        },
        {
          status: 400,
        }
      );
    }

    const product = await Product.findById(Id);

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "GET single product error:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to fetch product",
      },
      {
        status: 500,
      }
    );
  }
}

// UPDATE PRODUCT
export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const { Id } = await params;

    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        {
          status: 400,
        }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const slug = formData.get("slug");
    const description =
      formData.get("description");
    const brand = formData.get("brand");
    const category = formData.get("category");

    const price = formData.get("price");
    const discountPrice =
      formData.get("discountPrice");
    const stock = formData.get("stock");

    const featured =
      formData.get("featured") === "true";

    const isActive =
      formData.get("isActive") !== "false";

    const specifications = {
      movement:
        formData.get("movement") || "",

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

    // Required fields
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

    // Category validation
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

    // Price
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

    // Stock
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

    // Discount
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

    // Check product
    const product =
      await Product.findById(Id);

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check duplicate slug
    const existingProduct =
      await Product.findOne({
        slug: slug.toLowerCase(),
        _id: {
          $ne: Id,
        },
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

    // Update
    product.name = name;
    product.slug = slug.toLowerCase();
    product.description = description;
    product.brand = brand;
    product.category = category;

    product.price = numericPrice;
    product.discountPrice =
      numericDiscountPrice;
    product.stock = numericStock;

    product.specifications =
      specifications;

    product.featured = featured;
    product.isActive = isActive;

    await product.save();

    return Response.json({
      success: true,
      message:
        "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(
      "UPDATE product error:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to update product",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE PRODUCT
export async function DELETE(
  request,
  { params }
) {
  try {
    await dbConnect();

    const { Id } = await params;

    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        {
          status: 400,
        }
      );
    }

    const product =
      await Product.findByIdAndDelete(Id);

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE product error:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to delete product",
      },
      {
        status: 500,
      }
    );
  }
}