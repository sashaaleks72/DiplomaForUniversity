﻿using Data;
using Data.Entities;

namespace Catalog.Host.ResponseModels
{
    public class TeapotResponse
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Name { get; set; } = null!;

        public int Quantity { get; set; }

        public string Color { get; set; } = null!;

        public string BodyMaterial { get; set; } = null!;

        public int Power { get; set; }

        public double Price { get; set; }

        public string ImgName { get; set; } = null!;

        public double Volume { get; set; }

        public int WarrantyInMonths { get; set; }

        public string Functions { get; set; } = null!;

        public double Weight { get; set; }

        public object Company { get; set; } = null!;

        public bool StockAvailable
        {
            get
            {
                if (Quantity == 0) return false;
                else return true;
            }
        }

        public string ManufacturerCountry { get; set; } = null!;
    }
}
