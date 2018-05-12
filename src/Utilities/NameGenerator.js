const adjectives = ["Messy", "Big", "Evil", "Happy", "Spotty", "Thoughtful", "Grizzly", "Dizzy", "Lazy", "Dull", "Awesome", "Premium", "Smooth", "Nosy", "Salty", "Sleepy", "Humble", "Spicy", "Shady", "Greasy"];
const nouns = ["Lizard", "Neighbor", "Hero", "Mailman", "Dog", "Cat", "Iguana", "Horse", "Cabbage", "Captain", "Clown", "Panda", "Helicopter", "Wizard", "Vegetable"];

export const getRandomName = () => {
    var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    var noun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${adjective} ${noun}`;
}