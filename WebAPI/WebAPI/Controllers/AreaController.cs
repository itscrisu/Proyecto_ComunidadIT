using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreaController : ControllerBase
    {
        //Para acceder a la configuración desde appsettings, tengo que hacer una inyección de dependencia 
        private readonly IConfiguration _configuration;

        public AreaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //Ahora creo un metodo GET para tener todos los detalles de las áreas y ver si funciona desde POSTMAN

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select AreaId, AreaNombre from dbo.Area";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using SqlCommand myCommand = new SqlCommand(query, myCon);

                myReader = myCommand.ExecuteReader();
                table.Load(myReader); ;

                myReader.Close();
                myCon.Close();
            }

            return new JsonResult(table);
        }

        //Defino acá el metodo POST 

        [HttpPost]
        public JsonResult Post(Area area_1)
        {
            string query = @"
                    insert into dbo.Area values 
                    ('" + area_1.AreaNombre + @"')
                    ";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using SqlCommand myCommand = new SqlCommand(query, myCon);

                myReader = myCommand.ExecuteReader();
                table.Load(myReader); ;

                myReader.Close();
                myCon.Close();
            }
            return new JsonResult("Dato añadido con éxito");
        }

        //Acá defino un método PUT para actualizar nuestra base de datos

        [HttpPut]
        public JsonResult Put(Area area_1)
        {
            string query = @"
                    update dbo.Area set 
                    AreaNombre = '" + area_1.AreaNombre + @"'
                    where AreaId = "+ area_1.AreaId + @"
                    ";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using SqlCommand myCommand = new SqlCommand(query, myCon);

                myReader = myCommand.ExecuteReader();
                table.Load(myReader); ;

                myReader.Close();
                myCon.Close();
            }
            return new JsonResult("Dato actualizado con éxito");
        }

        //Y por último, mi método DELETE

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Area
                    where AreaId = " + id + @"
                    ";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using SqlCommand myCommand = new SqlCommand(query, myCon);

                myReader = myCommand.ExecuteReader();
                table.Load(myReader); ;

                myReader.Close();
                myCon.Close();
            }
            return new JsonResult("Dato borrado con éxito");
        }
    }
}
