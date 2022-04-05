
const datagen = {
    // utility function to create a random user
    user: function() {
        const title = ["Mx", "Mr", "Mrs", "Dr", "Miss"]
        const first = ["John", "Phillip", "Sheila", "Steven", "Palita"]
        const last = ["Michael", "James", "Aragon", "Hull", "Phillip"]
        const i = this.rn(first.length)
        const j = this.rn(last.length)
        const k = this.rn(title.length)
        const mobile = "085" + this.rn(9999999)
        const email = first[i].toLowerCase() + last[j].toLowerCase()+ (this.rn(100)+10)+"@email.com"
        return {title: title[k], firstname: first[i], surname:last[j], mobile, email}
    },
    // utility function to create a random address for user
    address: function() {
        const line1 = ["Dublin Road","Main Street", "Tolkien Street", "Beufield", "Straffan Wood"]
        const cities = ["Dublin", "Tallaght", "Lucan", "Maynooth", "Kildare"]
        const i = this.rn(line1.length)
        const j = this.rn(cities.length)
        const city = cities[j]
        const physical =  (this.rn(20)+1) + " " + line1[i]
        const shipping = physical
        const eircode = "W" + (this.rn(20)+10) + "V" + (this.rn(9)+1) + "K" + (this.rn(9)+1)
        return {physical: physical, shipping:shipping, city:city, eircode:eircode}
    },
    // random number function
    rn: function(range) {
        return Math.floor(Math.random() * range);
    }

}

module.exports = datagen
