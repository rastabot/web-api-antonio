//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ShoppingCart.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblProduct
    {
        public int ProductId { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public Nullable<double> Price { get; set; }
        public string Details { get; set; }
        public string Category { get; set; }
        public Nullable<int> Quantity { get; set; }
    }
}
