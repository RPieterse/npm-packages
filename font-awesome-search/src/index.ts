import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";
import * as brandIcons from "@fortawesome/free-brands-svg-icons";

interface IconList {
  [key: string]: solidIcons.IconDefinition | regularIcons.IconDefinition;
}

type IconType = "solid" | "regular" | "brands" | "duotone";

function getIconList(types: IconType[] | IconType) {
  if (types instanceof Array) {
    let iconList: IconList = {};
    types.forEach((type) => {
      switch (type) {
        case "brands":
          iconList = {
            ...iconList,
            ...(brandIcons as unknown as IconList),
          };
          break;
        case "regular":
        case "brands":
          iconList = {
            ...iconList,
            ...(regularIcons as unknown as IconList),
          };
          break;
        default:
        case "brands":
          iconList = {
            ...iconList,
            ...(solidIcons as unknown as IconList),
          };
          break;
      }
    });
    return iconList;
  } else {
    switch (types) {
      case "brands":
        return brandIcons as unknown as IconList;
      case "regular":
        return regularIcons as unknown as IconList;
      default:
        return solidIcons as unknown as IconList;
    }
  }
}

function getIcons(type: IconType[] | IconType) {
  const useIcons = getIconList(type);
  const keys = Object.keys(useIcons);

  return keys.map((key) => {
    return {
      name: useIcons[key].iconName,
      className: `fa-${type} fa-${useIcons[key].iconName}`,
    };
  });
}

export default function searchIcons(
  type: IconType[] | IconType,
  search: string,
  totalResults?: number
) {
  const icons = getIcons(type);
  if (search === "") {
    return [];
  }

  let matches = 0;

  return icons.filter((icon) => {
    if (
      icon.name?.toLowerCase().includes(search.toLowerCase()) &&
      matches < (totalResults || 10)
    ) {
      matches++;
      return true;
    }
    return false;
  }) as [{ name: string; className: string }];
}
