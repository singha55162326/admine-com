import React from 'react'

export const SalesStatistics = () => {
    return (
        <div className="col-xl-6 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <article className="card-body">
              <h5 className="card-title">ສະຖິຕິການຂາຍ</h5>
              <iframe 
              style={{
                background: "#FFFFFF",
                border:"none",
                borderRadius:"2px",
                boxShadow:"0 2px 10px 0 rgba(70, 76, 79, .2)",
                width:"100%",
                height:"350px",
              }}
              src="https://charts.mongodb.com/charts-bounnawatecommerce-jlgdo/embed/charts?id=62e7f4d9-e5b8-4427-8a6a-c87aeb8a3676&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            </article>
          </div>
        </div>
      );
}

export default SalesStatistics