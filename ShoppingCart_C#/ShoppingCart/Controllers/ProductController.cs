using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ShoppingCart.Models;
using System.Data.Entity;
using System.Threading.Tasks;

namespace ShoppingCart.Controllers
{
    [RoutePrefix("api/product")]

    public class ProductController : ApiController
    {
        ShoppinCartEntities objEntity = new ShoppinCartEntities();


        //api/product/AllProducts

        [Route("AllProducts")]
        public IQueryable<tblProduct> GetProducts()
        {
            try
            {
                return objEntity.tblProducts;
            }
            catch (Exception)
            {

                throw;
            }
        }




        //api/product/GetProductById/1
        [HttpGet]
        [Route("GetProductById/{id}")]
        public IHttpActionResult GetProductById(int id)
        {
            tblProduct myObj = new tblProduct();

            try
            {
                myObj = objEntity.tblProducts.Find(id);
                if (myObj == null)
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {

                throw;
            }
            return Ok(myObj);
        }

        // sums the the quantity of each product
        [Route("GetTotalQuantity")]
        public int GetTotalQuantity()
        {
            //var sum = table.Sum(x=>x.SomeProperty);
            var sum = (int)objEntity.tblProducts.Sum(x => x.Quantity);
            return sum;

        }

        //returns the quantity of each product - per id
        // api/product/GetSingleProductQuantity/1

        [Route("GetSingleProductQuantity/{id}")]
        public async Task<IHttpActionResult> GetSingleProductQuantity(int id)
        {
            //tblProduct myObj = new tblProduct();

            var quantity = await (from q in objEntity.tblProducts
                                  where q.ProductId == id
                                  select q.Quantity).FirstOrDefaultAsync();

            if (quantity==null)
            {
                return NotFound();
            }
            return Ok(quantity);
        }

        // add 1  to quantity
        [HttpPost]
        [Route("PostAddSingleProductQuantity/{id}")]
        public IHttpActionResult PostAddSingleProductQuantity(int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                tblProduct myObj = new tblProduct();

                myObj = objEntity.tblProducts.Find(id);
                if(myObj != null)
                {
                    myObj.Quantity += 1;
                }
                this.objEntity.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
            return Ok();
        }

        // substract 1  from quantity
        [HttpPost]
        [Route("PostRemoveSingleProductQuantity/{id}")]
        public IHttpActionResult PostRemoveSingleProductQuantity(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                tblProduct myObj = new tblProduct();

                myObj = objEntity.tblProducts.Find(id);
                var q = myObj.Quantity;

                if (myObj != null )
                {
                    if( q>0 )
                    {
                        myObj.Quantity -= 1;
                    }
                   
                }
                this.objEntity.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
            return Ok();
        }




        //returns the Price of each product - per id
        // api/product/GetProductPrice/1
        [Route("GetProductPrice/{id}")]
        public async Task<IHttpActionResult> GetProductPrice(int id)
        {
            //tblProduct myObj = new tblProduct();

            var quantity = await (from q in objEntity.tblProducts
                                  where q.ProductId == id
                                  select q.Price).FirstOrDefaultAsync();

            if (quantity == null)
            {
                return NotFound();
            }
            return Ok(quantity);
        }



    }
}
