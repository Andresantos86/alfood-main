import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"

const CadastroRestaurante = () => {

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const onSubmitForm = (evento: React.FormEvent<HTMLElement>) => {
    evento.preventDefault()
    console.log("preciso enviar dados api")
    axios.post('http://localhost:8000/api/v2/restaurantes/', {
      nome:nomeRestaurante
    }).then(()=>{
      alert("Restaurante cadastrado com sucesso!")
    })
  }

  return (
    <form onSubmit={onSubmitForm}>
      <TextField value={nomeRestaurante} 
        onChange={evento => setNomeRestaurante(evento.target.value)} 
        id="standard-basic" 
        label="Nome:" 
        variant="standard" />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>
  )
}
export default CadastroRestaurante;