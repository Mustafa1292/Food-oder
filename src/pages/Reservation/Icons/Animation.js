import Meat from "./em-Meat-small.png";
import Eggs from "./Eggs.png";
import Pancakes from "./pancake.png";

import Sushi from "./sushi.png";

const Animation = () => {
  return (
    <div>
      <img className="images" src={Meat} alt="Fast_food" />
      <img className="images" src={Eggs} alt="Hot_pot" />
      <img className="images" src={Pancakes} alt="Pasta" />
      <img className="images" src={Sushi} alt="Roast" />
    </div>
  );
};
export default Animation;
