import "./NavigationBox.scss";
import { CardLayout, CollapsableTree } from "@components/common/ui";

function NavigationBox() {
  // TODO: implement
  return (
    <CardLayout className="navigation-box" title="Shop By Categories">
      <CollapsableTree
        linkArrowColor="black"
        fontSize="14px"
        collapseList={[
          {
            title: "Home",
            url: "/",
            children: [
              {
                title: "All Collections",
                url: "/store",
                children: <div>Fetching Collections</div>,
              },
            ],
          },
          {
            title: "Our Store",
            url: "/store",
          },
          {
            title: "blogs",
            url: "/blogs",
          },
          {
            title: "contact",
            url: "/contact",
          },
        ]}
      />
    </CardLayout>
  );
}

export default NavigationBox;
