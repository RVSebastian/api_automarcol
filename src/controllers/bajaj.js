import { getConection } from "../databases/conection";

/* Method that search in all databases(Sales & Services) the client by plate. */
export const getBajajInv = async (req, res) => {
  /* Getting the connection to the database. */
  const pool = await getConection();

  try {
    /* A query to the Service database. */

    const bajaj = await pool.request().query(`select
    DISTINCT I1.Marca,
    I1.Version_DescipcionModelo,
    I1.Ano_Modelo,
    VT.costoactual,
    I1.Clase,
    IMG.presentation_img AS PresentationIMG,
    IMG.carrousel_img AS CarrouselIMG,
    IMG.collage_img AS CollageIMG,
    IMG.traccion AS Traccion,
    IMG.cilindraje AS Cilindraje,
    IMG.combustible AS Combustible,
    IMG.Puertas AS Puertas,
    IMG.cojineria AS Cojineria,
    IMG.otro AS Otro,
    UPPER(I1.status) AS Status
from
    INVNUE01_2021_BAJAJ AS I1
    LEFT JOIN INVNUE01_2021_BAJAJ as vt on vt.Version_DescipcionModelo = I1.Version_DescipcionModelo
    LEFT JOIN img_modelo as img on img.modelo = I1.Version_DescipcionModelo`);

    if (!!bajaj) {
      const filteredCars = bajaj.recordset.reduce((uniqueCars, car) => {
        const version = car.Version_DescipcionModelo.trim().toUpperCase();
        if (car.costoactual >= 0 && !uniqueCars.some(uniqueCar => uniqueCar.Version_DescipcionModelo.trim().toUpperCase() === version)) {
            car.Version_DescipcionModelo = version;
            uniqueCars.push(car);
        }
        return uniqueCars;
    }, []);
      return res.status(200).json(filteredCars);
    }
    /*  if everything else fails, return a 404 error. */
    return res.status(404).json({ message: "operation failed" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBajajrep = async (req, res) => {
  /* Getting the connection to the database. */
  const pool = await getConection();

  try {
    /* A query to the Service database. */

    const bajaj = await pool.request().query(`select distinct 
    I1.Bodega AS Marca,
    I1.NumeroParte AS Parte,
    I1.descripcion AS Descripcion,
    I1.existencia,
    I1.Costo,
    img.otro AS otro,
    img.presentation_img AS presentation_img,
    img.carrousel_img AS carrousel_img,
    img.collage_img AS collage_img
    FROM REFINV01_2021_BAJAJ AS I1 -- cambiar la tabla por marca
    LEFT JOIN img_modelo AS img ON img.modelo = I1.NumeroParte`);

    if (!!bajaj) {
      return res.status(200).json(bajaj.recordset);
    }
    /*  if everything else fails, return a 404 error. */
    return res.status(404).json({ message: "operation failed" });
  } catch (error) {
    res.status(500).json(error);
  }
};
