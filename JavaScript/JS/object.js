/*let name = 'Arm';

let rabbit = {
        name: 'Ohell',
        breed: 'Lion Head',
        color: 'White',
        weight: 2,
        talk() {
            console.log(this.name + ': ' + '"Oung Oung!"')
        },
        weightDetail() {
            if (this.weight < 1)
                return 'My weight is too light!';
            else if (this.weight > 5)
                return 'My weight is too heavy!';
            else
                return 'My weight is normal!';
        }
};

rabbit.talk();
console.log(rabbit.weightDetail());*/

function Rabbit(name, breed, color, weight) {
    this.name = name;
    this.breed = breed;
    this.color = color;
    this.weight = weight;
    this.talk = function() {
        console.log(this.name + ': ' + 'Oung Oung');
    }
}

let rabbit1 = new Rabbit("Oho", "American", "white", 1.3);
let rabbit2 = new Rabbit("Ohey", "Thai", "white", 1.5);

console.log(rabbit1);
console.log(rabbit2);
rabbit1.talk();
rabbit2.talk();