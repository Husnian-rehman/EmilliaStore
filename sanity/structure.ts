import type { StructureResolver } from "sanity/structure";

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ========== GLOBAL SETTINGS ==========
      S.listItem()
        .title("Global Settings")
        .child(
          S.list()
            .title("Global Settings")
            .items([
              S.documentTypeListItem("header").title("Header"),
             
            ])
        ),

      // ========== HOME PAGE (ONLY FEATURED COLLECTION) ==========
      S.listItem()
        .id("home-page-sections")
        .title("Home Page")
        .child(
          S.list()
            .title("Home Page Sections")
            .items([
               S.documentTypeListItem("banner").title("Banner"),
                S.documentTypeListItem("cardSection").title("Card Section"),
                S.documentTypeListItem("faqSection").title("FAQ Section"),
            ])
        ),

      // ========== CONTACT PAGE ==========
      S.listItem()
        .title("Contact Page")
        .child(
          S.list()
            .title("Contact Page Sections")
            .items([
               S.documentTypeListItem("breadcrumbContact").title("Breadcrumb Contact Section"),
            ])
        ),

        // =========== WISHLEST PAGE ==========
        S.listItem()
        .title("Wishlist Page")
        .child(
          S.list()
            .title("Wishlist Page Sections")
            .items([
              S.documentTypeListItem("wishlistBreadcrumb").title("Wishlist Breadcrumb Section"),
            ])
        ),

            // =========== WISHLEST PAGE ==========
        S.listItem()
        .title("Cart Page")
        .child(
          S.list()
            .title("Cart Page Sections")
            .items([
                S.documentTypeListItem("cartBreadcrumb").title("Cart Breadcrumb Section"),
            ])
        ),

      // ========== OTHER DOCUMENTS (AUTO) ==========
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== undefined &&
          ![
            "header",
            "banner",
            "breadcrumbContact",
            "cartBreadcrumb",
            "wishlistBreadcrumb",
            "cardSection",
            "faqSection",

          ].includes(item.getId()!)
      ),
    ]);

export default structure;
