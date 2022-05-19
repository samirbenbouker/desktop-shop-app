import React from 'react'
import Navbar from '../components/Navbar'
import ProductContent from '../components/ProductContent'

function Product() {
    return (
        <div>
            <Navbar />
            <div style={{ margin: "1rem 1rem 1rem 1rem" }}>
                <ProductContent />
            </div>
        </div>
    )
}

export default Product