import React from 'react'

export const ProductsStatistics = () => {
    return (
        <div className="col-xl-6 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <article className="card-body">
              <h5 className="card-title">ສະຖິຕິສິນຄ້າ</h5>
              <iframe 
              style={{
                background: "#FFFFFF",
                border:"none",
                borderRadius:"2px",
                boxShadow:"0 2px 10px 0 rgba(70, 76, 79, .2)",
                width:"100%",
                height:"350px",
              }}
              src="https://charts.mongodb.com/charts-bounnawatecommerce-jlgdo/embed/charts?id=62e7fff5-5694-4da9-8b1c-5999c2a11bd5&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            </article>
          </div>
        </div>
      );
}

export default ProductsStatistics;