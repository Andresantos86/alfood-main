import { TableContainer, Paper, TableHead, Table, TableRow, TableCell, TableBody, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Restaurante from "../../../componentes/ListaRestaurantes/Restaurante";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(()=>{
    axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/').then(
      resposta => setRestaurantes(resposta.data))
  },[])

  const excluir = (restauranteExcluir: IRestaurante)=>{
    axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteExcluir.id}/`)
    .then(()=>{
      const listaRestaurantes = restaurantes.filter(Restaurante => Restaurante.id !== restauranteExcluir.id)
      setRestaurantes([...listaRestaurantes])
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
            <TableCell>
              {restaurante.nome}
            </TableCell>
            <TableCell>
              [<Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
            </TableCell>
            <TableCell>
              <Button variant='outlined' color= 'error' onClick={()=> excluir(restaurante)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes;