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
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public EmpleadoController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        //Ahora creo un metodo GET para tener todos los detalles de las áreas y ver si funciona desde POSTMAN

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select EmpleadoId, EmpleadoNombre, Area, 
                    convert(varchar(10),FechaDeInicio,120) as FechaDeInicio, 
                    FotoPerfil
                    from dbo.Empleados
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

            return new JsonResult(table);
        }

        //Defino acá el metodo POST para ver si funciona desde POSTMAN

        [HttpPost]
        public JsonResult Post(Empleados emp)
        {
            string query = @"
                    insert into dbo.Empleados
                    (EmpleadoNombre,Area,FechaDeInicio,FotoPerfil)
                    values 
                    (
                    '" + emp.EmpleadoNombre + @"'
                    ,'" + emp.Area + @"'
                    ,'" + emp.FechaDeInicio + @"'
                    ,'" + emp.FotoPerfil + @"'
                    )
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
        public JsonResult Put(Empleados emp)
        {
            string query = @"
                    update dbo.Empleados set 
                    EmpleadoNombre = '" + emp.EmpleadoNombre + @"'
                    ,Area = '" + emp.Area + @"'
                    ,FechaDeInicio = '" + emp.FechaDeInicio + @"'
                    ,FotoPerfil = '" + emp.FotoPerfil + @"'
                    where EmpleadoId = " + emp.EmpleadoId + @"
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
                    delete from dbo.Empleados
                    where EmpleadoId = " + id + @"
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

        // Tengo que utilizar la inyeccion de dependencia en este metodo para acceder a mi carpeta Fotos porque quiero que se guarden ahí las mismas.

        [Route("GuardarArchivo")]
        [HttpPost]

        public JsonResult GuardarArchivo()
        {
            
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var uploads = Path.Combine(_env.WebRootFileProvider.ToString(), "/Fotos/");
                //var physicalPath = _env.ContentRootFileProvider + "/Fotos/" + fileName;
                var fisicalPath = _env.WebRootFileProvider + "/Fotos/" + fileName;

                //Basicamente quiero que se copie la imagen en mi carpeta. En caso de que exista alguna excepción, simplemente voy a retornar el archivo anon.png
                using (var stream = new FileStream(uploads, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                //using (var stream = new FileStream(physicalPath, FileMode.Create))
                //{
                //    postedFile.CopyTo(stream);
                //}
               

                return new JsonResult(fileName);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new JsonResult("anon.png");
            }
        }

        //Se me ocurrió que quizás sería necesario hacer un método para obtener todos los nombres de las áreas creadas. 

        [Route("GetAllAreas")]
        public JsonResult GetAllAreas()
        {
            string query = @"
                    select AreaNombre from dbo.Area
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

            return new JsonResult(table);
        }
    }
}
