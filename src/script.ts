import { IThumb } from "./components/thumb/thumb";
import Api from "./api/api";
import {IBannerData} from "./api/interfaces";
import {createBannerSection, createFilter, createThumbSection} from "./components/helpers";
import {PageController} from "./components/pageController/pageController";

// Костыль, чтобы работало аналогично defer при импорте скрипта; на реакте выпилю
document.addEventListener("DOMContentLoaded", function () {
  async function initPage(signal?: AbortSignal) {
    const bannerIds = [119133, 11208, 114283];
    const bannerNames: { [key: number]: string } = {
      119133: "Challenge the Elden Lords",
      11208: "2B or not 2B?",
      114283: "Steal The Show (Again)",
    };
    
    const thumbPromises = [
      Api.getBannerById(bannerIds, signal),
      Api.getThumbData("where rating >= 90 & keywords = [521] & genres != null & cover != null;sort total_rating_count desc;limit 18;", signal),
      Api.getThumbData("where rating >= 85 & genres != null & cover != null;sort total_rating_count desc;limit 27;", signal),
    ];
    const [bannerData, jrpgThumbData, popularThumbData] = await
        Promise.all<IThumb[] | IBannerData[] | Error>(thumbPromises);

    const bannerContainer = createBannerSection("Highlights", (bannerData as IBannerData[]), bannerNames);
    const jrpgThumbSection = createThumbSection("Best JRPG's", (jrpgThumbData as IThumb[]));
    const popularSection = createThumbSection("Popular", (popularThumbData as IThumb[]));

    return [bannerContainer.getNode(), popularSection.getNode(), jrpgThumbSection.getNode()]
  }

  Api.setCredentials(
    "8wzpcv3pynyoc0djpc2bibx33lt1gj",
    "m7uvb7bhqjewm1ac9tnfcxl4xexi9w"
  );

  const filter = createFilter();
  const pageController = new PageController(filter, initPage);
});
