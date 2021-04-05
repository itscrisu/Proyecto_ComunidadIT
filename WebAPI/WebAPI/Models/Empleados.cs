using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Console;

namespace WebAPI.Models
{
    public class Empleados
    {
        public int EmpleadoId { get; set; }
        public string EmpleadoNombre { get; set; }
        public string Area { get; set; }
        public string FechaDeInicio { get; set; }
        public string FotoPerfil { get; set; }

    }
}
