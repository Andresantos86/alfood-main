import { TableContainer, Paper, TableHead, Table, TableRow, TableCell, TableBody, Button } from "@mui/material";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";


const ListaPratos = () => {
  const [prato, setPrato] = useState<IPrato[]>([])

  useEffect(()=>{
    http.get<IPrato[]>('pratos/').then(
      resposta => setPrato(resposta.data))
  },[])

  const excluir = (pratoExcluir: IPrato)=>{
    http.delete(`pratos/${pratoExcluir.id}/`)
    .then(()=>{
      const listaPrato = prato.filter(prato => prato.id !== pratoExcluir.id)
      setPrato([...listaPrato])
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
              Tag
            </TableCell>
            <TableCell>
              imagem
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
          {prato.map(prato => <TableRow key={prato.id}>
            <TableCell>
              {prato.nome}
            </TableCell>            
            <TableCell>
              {prato.tag}
            </TableCell>
            <TableCell>
              <a href={prato.imagem} target='_blank' rel="noreferrer">Ver imagem</a>
            </TableCell>
            <TableCell>
              [<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
            </TableCell>
            <TableCell>
              <Button variant='outlined' color= 'error' onClick={()=> excluir(prato)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ListaPratos;