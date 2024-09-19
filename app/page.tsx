import { Info } from "@/components/Homepage/Info";
import { NewsComponent } from "@/components/Homepage/NewsComponent";
import { NOone } from "@/components/Homepage/NO1";
import { Slider } from "@/components/Homepage/Slider";
import { TopAnime } from "@/components/Homepage/TopAnime";



export default async function Home() {

   
  return (
    <div className="flex justify-center items-center flex-col mt-20 lato_init text-white">
      <Slider/>
      <Info/>
      <NOone/>
      <TopAnime/>
      <NewsComponent/>
    </div>
  );
}
