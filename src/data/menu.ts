export type MenuItem = { name: string; price: string; desc?: string; isNew?: boolean };
export type MenuGroup = {
  title: string;
  note?: string;
  // "list" shows name, price and description; "chips" is a compact grid for sides and drinks
  style: "list" | "chips";
  items: MenuItem[];
};

export const breakfast: MenuGroup[] = [
  {
    title: "Breakfast",
    note: "Large portions for the hungry.",
    style: "list",
    items: [
      { name: "Early Bird Special", price: "12.89", desc: "Two eggs, home fries, choice of meat, served with a pancake or toast." },
      { name: "Breakfast Sandwich", price: "9.80", desc: "Two eggs, American cheese and choice of meat on French bread." },
      { name: "Breakfast Waffle", price: "12.50", desc: "Waffle sandwich with eggs, cheese and choice of meat." },
      { name: "Loaded Home Fries", price: "11.35", desc: "Fresh-cut seasoned potatoes, peppers and onions, chopped meat of your choice and a handful of cheese.", isNew: true },
      { name: "2 Eggs, Meat & Toast", price: "8.76", desc: "Two eggs, choice of meat, choice of toast." },
      { name: "2 Eggs & Toast", price: "5.14", desc: "Two eggs and choice of toast." },
    ],
  },
  {
    title: "Omelettes",
    note: "Made to order with the freshest ingredients.",
    style: "list",
    items: [
      { name: "Kitchen Sink", price: "12.89", desc: "Choice of meat, peppers, onions and cheese, served with home fries." },
      { name: "Meat Lovers", price: "13.50", desc: "Sausage, bacon and ham with cheddar cheese and choice of toast." },
      { name: "Ham & Cheese", price: "9.82", desc: "Chopped ham, American cheese and choice of toast." },
      { name: "Build Your Own", price: "9.82", desc: "Pick two: spinach, peppers, onions, tomato, cheese, meat or home fries. Extras $1.00 each." },
    ],
  },
  {
    title: "Pancakes & French Toast",
    note: "Fluffy buttermilk pancakes and thick artisan French toast.",
    style: "list",
    items: [
      { name: "Cherry Bomb Pancakes", price: "8.28", desc: "Stuffed with cherries, blueberries or strawberries and topped with a generous amount of whipped cream." },
      { name: "Very Cherry French Toast", price: "8.80", desc: "Stuffed with cream cheese, with your choice of strawberries, blueberries or cherries." },
      { name: "2 Fluffy Pancakes", price: "6.73", desc: "Add cherries, blueberries, strawberries or whipped cream for $1.25 each." },
      { name: "2 French Toast", price: "8.17", desc: "French bread dusted with powdered sugar. Add fruit or whipped cream for $1.00 each." },
      { name: "2 Belgian Waffles", price: "6.47", desc: "Add cherries, blueberries, strawberries or whipped cream for $1.00 each." },
    ],
  },
  {
    title: "Breakfast sides",
    style: "chips",
    items: [
      { name: "Home fries", price: "4.40" },
      { name: "Toast", price: "1.85" },
      { name: "1 egg", price: "2.59" },
      { name: "Grits", price: "4.14" },
      { name: "1 French toast", price: "4.66" },
      { name: "1 pancake", price: "3.88" },
      { name: "1 waffle", price: "3.88" },
      { name: "Side of meat", price: "3.88" },
      { name: "English muffin", price: "3.11" },
      { name: "Bagel", price: "3.62" },
    ],
  },
  {
    title: "Drinks",
    style: "chips",
    items: [
      { name: "Coffee", price: "2.88" },
      { name: "Hot tea", price: "2.85" },
      { name: "Everfresh juice", price: "3.11" },
      { name: "Small juice", price: "2.59" },
      { name: "Milk", price: "3.62" },
      { name: "Chocolate milk", price: "3.88" },
      { name: "Can of soda", price: "1.50" },
      { name: "Bottle of soda", price: "3.36" },
      { name: "Bottled water", price: "2.07" },
    ],
  },
];

export const lunchCombo = {
  title: "Make it a combo",
  desc: "Any burger or sandwich with fries and a canned soda.",
  price: "12.86",
};

export const lunch: MenuGroup[] = [
  {
    title: "Hoagies & Sandwiches",
    style: "list",
    items: [
      { name: "Philly Cheesesteak", price: "9.06", desc: "Lettuce, tomato, mayo, peppers, onions and cheese." },
      { name: "Chicken Steak", price: "9.06", desc: "Peppers, onions and cheese." },
      { name: "Reuben", price: "9.06", desc: "Corned beef, sauerkraut, Swiss cheese and Thousand Island dressing." },
      { name: "Classic Club", price: "9.06", desc: "Turkey, bacon, lettuce, tomato and cheese." },
      { name: "Gyro", price: "9.06", desc: "Lamb and beef cooked with onions, lettuce, tomato and tzatziki sauce." },
      { name: "Grilled Chicken Sandwich", price: "9.06", desc: "Grilled, breaded or buffalo." },
      { name: "Cod Fish Sandwich", price: "9.06", desc: "Fried cod with tartar sauce." },
      { name: "Grilled Sausage Sandwich", price: "8.28", desc: "Hot or sweet, with provolone, peppers and onions." },
      { name: "Grilled Quesadilla", price: "8.28", desc: "Zesty grilled chicken, cheese, sour cream and onions." },
      { name: "Turkey & Swiss", price: "7.50", desc: "Add bacon for $1.50." },
      { name: "Ham & Cheese", price: "7.50", desc: "Add bacon for $1.25." },
      { name: "Basic BLT", price: "7.25", desc: "Add cheese for $1.25." },
      { name: "Grilled Cheese", price: "7.25", desc: "On Italian bread, overloaded with cheese." },
      { name: "Tuna Sandwich", price: "6.47", desc: "Seasoned tuna with mayo." },
    ],
  },
  {
    title: "Burgers",
    note: "Toppings: lettuce, tomato, onions, pickles and mushrooms.",
    style: "list",
    items: [
      { name: "Hamburger", price: "6.21" },
      { name: "Cheeseburger", price: "7.25", desc: "Swiss, American, provolone or cheddar." },
      { name: "Mushroom Swiss Burger", price: "7.76" },
      { name: "Bacon Cheeseburger", price: "7.76" },
    ],
  },
  {
    title: "Salads",
    note: "Dressings: ranch, blue cheese, Italian or French.",
    style: "list",
    items: [
      { name: "Steak Salad", price: "10.86", desc: "Shredded steak, lettuce, tomato, peppers, onions, fries and cheese." },
      { name: "Chicken Salad", price: "10.86", desc: "Grilled chicken, lettuce, tomato, peppers, onions, fries and cheese." },
      { name: "Chef Salad", price: "10.86", desc: "Ham, turkey, lettuce, tomato, peppers, onions, fries and cheese." },
    ],
  },
  {
    title: "Lunch sides",
    style: "list",
    items: [
      { name: "French Fries", price: "4.14", desc: "Add cheese for $1.50." },
      { name: "Onion Rings", price: "4.14" },
      { name: "Hot Dog", price: "3.36", desc: "Make it a combo for $9.57." },
      { name: "6 Breaded Wings", price: "7.25", desc: "Regular or buffalo." },
    ],
  },
];
