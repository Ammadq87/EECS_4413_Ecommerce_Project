import axios from "axios";
axios.defaults.withCredentials = true
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/lib/utils";
export default class CartService {
    static DB = axios.create({baseURL: 'http://localhost:3001/Cart', withCredentials: true })

    static async addtoCart(shoe_id) {
        try {
            const response = await this.DB.post('/AddToCart', {shoe_id})
            return response
        } catch (err) {
            console.log(err)
        }
    }

    static async getOrderSummary(id, token) {
        try {

            const response = await this.DB.get(`/OrderSummary/${id}`, {
                headers: {
                    Authorization: token
                }
            })

            return response.data.data

        } catch (err) {
            console.log(err)
            return {message: 'Internal Server Error'}
        }
    }

    /**
     * 
     * @param {Object[]} items 
     * @param {Object} cart 
     * @returns 
     */
    static transformCart(items, cart) {
        if (Object.keys(cart).length === 0)
            return items

        let total = 0

        for (const [key, value] of Object.entries(cart)) {
            
            total += value.qty * value.price
            items.push({...value})
        }

        const gst = total * .13
        const estTotal = total * 1.13
        return {total, gst, estTotal, items}
    }

    static async getCart() {
        try {
            const response = await this.DB.get('/GetCart')
            const cart = response.data
            const items = []
            return this.transformCart(items, cart)
            
        } catch (err) {
            console.log(err)
            return []
        }
    } 

    /**
     * 
     * @param {number} id 
     */
    static async removeFromCart(shoe_id) {
        // debugger
        
        try {
            const response = await this.DB.post('/RemoveFromCart', {shoe_id})
            console.log(response)
            return response            
        } catch (err) {
            return {message: err.message, data: []}
        }
    }

    /**
     * 
     * @param {number} amt 
     * @param {string} id 
     */
    static async updateQuantity(qty, shoe_id) {
        try {
            const response = await this.DB.post('/UpdateQuantity', {qty, shoe_id})
            return response
        } catch (err) {
            return {message: err.message, data: []}
        }
    }

    static async clearCart() {
        try {
            const response = await this.DB.post('/ClearCart')
            return response
        } catch (err) {

        }
    }

    static async proceedToCheckout() {
        // debugger
        if (this.isTokenExpired()) 
            return false
        
        // Verify checkout
        const verifyCheckout = await this.DB.get('/VerifyCheckout')
        const data = verifyCheckout.data

        // Display any error response
        if (data.message !== '') {
            alert(data.message)
            return false
        }

        // User can proceed to checkout
        return true
    }

    static async checkout(token, payment_id) {
        try {
            const response = await this.DB.post('/Checkout', {
                payment_id
            }, {
                headers: {
                    Authorization: token
                }
            })

            return response

        } catch (err) {
            console.log(err.message)
        }
    }

    static isTokenExpired() {
        debugger
        const token = getToken()
        if (token == "undefined") return true
        
        try {
          const decodedToken = jwtDecode(token)
          const exp = decodedToken.exp
          const currentTime = Math.floor(Date.now() / 1000)
          return exp < currentTime
        } catch (error) {
          console.error('Error decoding token:', error)
          return true
        }
      }
} 