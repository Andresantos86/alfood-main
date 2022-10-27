import { Box, Button, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const CadastroRestaurante = () => {

  const [nomeRestaurante, setNomeRestaurante] = useState('')
  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`).then(
        resposta => setNomeRestaurante(resposta.data.nome)
      )
    }
  }, [parametros])

  const onSubmitForm = (evento: React.FormEvent<HTMLElement>) => {
    evento.preventDefault()
    if (parametros.id) {
      axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      }).then(() => {
        alert("Restaurante atualizado com sucesso!")
      })
    } else {
      axios.post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nomeRestaurante
      }).then(() => {
        alert("Restaurante cadastrado com sucesso!")
      })

    }
  }

  return (
    <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
      <Typography component='h1' variant="h6">Formulário de Restaurantes</Typography>
      <Box component={'form'} onSubmit={onSubmitForm}>
        <TextField value={nomeRestaurante}
          onChange={evento => setNomeRestaurante(evento.target.value)}
          id="standard-basic"
          label="Nome do restaurante:"
          variant="standard"
          fullWidth
          required />
        <Button sx={{marginTop: 1}} type="submit" fullWidth variant="outlined">Salvar</Button>
      </Box>
    </Box>
  )
}
export default CadastroRestaurante;