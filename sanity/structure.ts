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
               S.documentTypeListItem("footer").title("Footer"),
              S.documentTypeListItem("popup").title("Newsletter Popup"),
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
                S.documentTypeListItem("marqueeBar").title("Marquee Bar"),
                S.documentTypeListItem("cardSection").title("Card Section"),
                S.documentTypeListItem("services").title("Services Section"),
                S.documentTypeListItem("faqSection").title("FAQ Section"),
                S.documentTypeListItem("aboutUsSection").title("About Us Section"),
                S.documentTypeListItem("homeVideo").title("Home Page Video Section"),
            
            ])
        ),

              // ===========Allproduct PAGE ==========
        S.listItem()
        .title("Collection Page")
        .child(
          S.list()
            .title("Collection Page Sections")
            .items([
                S.documentTypeListItem("allProductsBreadcrumb").title("All Products Breadcrumb Section"),
            ])
        ),

        // ========== About PAGE ==========
      S.listItem()
        .title("About Page")
        .child(
          S.list()
            .title("About Page Sections")
            .items([
               S.documentTypeListItem("aboutbreadcrumb").title("About Breadcrumb Section"),
                S.documentTypeListItem("aboutbanner").title("About Banner Section"),
            ])
        ),
      
           // ========== FAQ PAGE ==========
      S.listItem()
        .title("FAQ Page")
        .child(
          S.list()
            .title("FAQ Page Sections")
            .items([
               S.documentTypeListItem("faqBreadcrumb").title("FAQ Breadcrumb Section"),
                S.documentTypeListItem("faqPageSection").title("FAQ Page Content Section"),
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
                S.documentTypeListItem("contact").title("Contact Page Content"),
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
            "footer",
            "banner",
            "breadcrumbContact",
            "cartBreadcrumb",
            "wishlistBreadcrumb",
            "cardSection",
            "faqSection",
            "services",
            "popup",
            "contact",
            "aboutbreadcrumb",
            "aboutbanner",
            "aboutUsSection",
            "aboutDetailSection",
            "faqBreadcrumb",
            "homeVideo",
            "faqPageSection",
            "marqueeBar",
            "allProductsBreadcrumb",

          ].includes(item.getId()!)
      ),
    ]);

export default structure;
