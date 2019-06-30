using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ShoppingCart.Models;

namespace ShoppingCart.Controllers
{
    [RoutePrefix("api/form")]
    public class ContactFormController : ApiController
    {
        ShoppinCartEntities3 formEntity = new ShoppinCartEntities3();


        [Route("GetAllComplains")]
        public IQueryable<tblContactForm> GetAllComplains()
        {
            try
            {
                return formEntity.tblContactForms;
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Route("CreateComplain")]
        public IHttpActionResult PostComplain(tblContactForm data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                formEntity.tblContactForms.Add(data);
                formEntity.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
            return Ok(data);
        }


        [Route("DeleteComplain/{id}")]
        public IHttpActionResult DeleteComplain(int id)
        {
            tblContactForm myForm = formEntity.tblContactForms.Find(id);
            if(myForm == null)
            {
                return NotFound();
            }
            formEntity.tblContactForms.Remove(myForm);
            formEntity.SaveChanges();
            return Ok(myForm);
        }
       

    }
}
