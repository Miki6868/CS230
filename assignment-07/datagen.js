
module.exports = {
    // utility function to create a random user
    user: function() {
        const user_id = this.rn(10000000)
        const title = ["Mx", "Mr", "Mrs", "Dr", "Miss"]
        const first = ["John", "Phillip", "James", "Carl", "Alvin", "Aaron", "Bruce", "Casey", "David"]
        const last = ["Michael", "Carter", "Chapman", "Hull", "Carrick"]
        const i = this.rn(first.length)
        const j = this.rn(last.length)
        const k = this.rn(title.length)
        const mobile = "085" + this.rn(9999999)
        const email = first[i].toLowerCase() + last[j].toLowerCase()+ (this.rn(100)+10)+"@email.com"

        console.log(user_id)
        return {user_id, title: title[k], firstname: first[i], surname:last[j], mobile, email}
    },
    // utility function to create a random address for user
    address: function() {
        const line1 = ["Main Ave","Main Street", "Tolkien Street", "Beaufield Ave", "Straffan Wood", "Greene Estate"]
        const town = ["Maynooth", "Tallaght", "Lucan", "Kildare", "Wicklow"]
        const cities = ["Dublin", "Leimrick", "Waterford", "Cork"]
        const i = this.rn(line1.length)
        const j = this.rn(cities.length)
        const k = this.rn(cities.length)
        const city = cities[j]
        const physical =  (this.rn(20)+1) + " " + line1[i]
        const shipping = physical
        const eircode = "W" + (this.rn(20)+10) + "V" + (this.rn(9)+1) + "K" + (this.rn(9)+1)
        return {home: physical, shipping:shipping, town: town[k], city:city, eircode:eircode}
    },

    item: function() {
        const phones = [
            {item_id:this.rn(100000), manufacturer: "Apple", model: "iPhone SE", price: 400}, 
            {item_id:this.rn(100000), manufacturer: "Apple", model: "iPhone 7", price: 200}, 
            {item_id:this.rn(100000), manufacturer: "Apple", model: "iPhone 8", price: 260}, 
            {item_id:this.rn(100000), manufacturer: "Apple", model: "iPhone X", price: 300}, 
            {item_id:this.rn(100000), manufacturer: "Apple", model: "iPhone XS", price: 340}, 
            {item_id:this.rn(100000), manufacturer: "Apple", model: "iPhone 11 Pro Max", price: 500}, 
            {item_id:this.rn(100000), manufacturer: "Apple", model: "iPhone 12 Mini", price: 600}, 
            {item_id:this.rn(100000), manufacturer: "Apple", model: "iPhone 12 Pro", price: 799}, 
            {item_id:this.rn(100000), manufacturer: "Apple", model: "iPhone 13 Pro Max", price: 999},
            {item_id:this.rn(100000), manufacturer: "Samsung", model: "Galaxy S7", price: 169}, 
            {item_id:this.rn(100000), manufacturer: "Samsung", model: "Galaxy S8", price: 199}, 
            {item_id:this.rn(100000), manufacturer: "Samsung", model: "Galaxy S9", price: 260}, 
            {item_id:this.rn(100000), manufacturer: "Samsung", model: "Galaxy S10", price: 300}, 
            {item_id:this.rn(100000), manufacturer: "Samsung", model: "Galaxy S20", price: 360}, 
            {item_id:this.rn(100000), manufacturer: "Samsung", model: "Galaxy S21", price: 450}, 
            {item_id:this.rn(100000), manufacturer: "Samsung", model: "Galaxy S22", price: 600}, 
            {item_id:this.rn(100000), manufacturer: "Samsung", model: "Galaxy Tab A", price: 240}, 
            {item_id:this.rn(100000), manufacturer: "Samsung", model: "Galaxy Tab S", price: 499},
            {item_id:this.rn(100000), manufacturer: "Huawai", model: "Mate Tab", price: 399}, 
            {item_id:this.rn(100000), manufacturer: "Huawai", model: "Mate Pro 20", price: 360}, 
            {item_id:this.rn(100000), manufacturer: "Huawai", model: "Mate Pro 20 mini", price: 300}, 
            {item_id:this.rn(100000), manufacturer: "Huawai", model: "Mate Pro 40", price: 799}, 
        ]
        // return phones;
        return phones[this.rn(phones.length)]        
    },

    order: function({ user_id, firstname, email }, items) {
        const purchases = []
        for (let i = 0; i < items.length; i++) {
            const purchase = {}
            purchase['purchase_id'] = i
            purchase['item_id'] = items[i].item_id
            purchases.push(purchase)
        }
        return { 
            order_id: this.rn(1000000), 
            user_id, 
            firstname, 
            email, 
            purchases //items.map(i => i.item_id)
        }
    },

    // random number function
    rn: function(range) {
        return Math.floor(Math.random() * range);
    },

    PrettyPrintMyData(data, title) {
        console.log("\n**********************")
        console.log(`*** ${title} ***`)
        console.log("**********************")
        data.forEach(function(p, index){
            for (var key in p){
                if (key === "_id") continue;
                if (key === "purchases") {
                    console.log(key, ":", p[key])
                } else {
                    console.log(key, ":", p[key]);
                }
            }
        });
        console.log("**********************")
    }

}