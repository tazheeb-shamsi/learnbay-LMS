import { Document, Schema, model } from "mongoose";

export interface FaqItemsInterface extends Document {
  question: string;
  answer: string;
}

export interface CategoryInterface extends Document {
  title: string;
}

export interface BannerImageInterface extends Document {
  public_id: string;
  url: string;
}

interface LayoutInterface extends Document {
  type: string;
  faq: FaqItemsInterface[];
  categories: CategoryInterface[];
  banners: {
    image: BannerImageInterface;
    title: string;
    subTitle: string;
  };
}

const faqSchema = new Schema<FaqItemsInterface>({
  question: { type: String },
  answer: { type: String },
});

const categorySchema = new Schema<CategoryInterface>({
  title: { type: String },
});

const bannerImageSchema = new Schema<BannerImageInterface>({
  public_id: { type: String },
  url: { type: String },
});

const layoutSchema = new Schema<LayoutInterface>({
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  banners: {
    image: { bannerImageSchema },
    title: { type: String },
    subTitle: { type: String },
  },
});

const layoutModel = model<LayoutInterface>("Layout", layoutSchema);
export default layoutModel;
