import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import Itag from "../../../interfaces/Itags"


const FormularioPratos = () => {
  
  const [pratosNome, setPratosNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tag, setTag] = useState('')
  const [restaurante , setRestaurante] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)
  const [tags, setTags] = useState<Itag[]>([])
  const [restaurantes , setRestaurantes] = useState<IRestaurante[]>([])
  
  useEffect(()=>{
    http.get<{tags: Itag[]}>('tags/').then(resposta => setTags(resposta.data.tags))
    http.get<IRestaurante[]>('restaurantes/').then(resposta => setRestaurantes(resposta.data))
  },[])
 

  const onSubmitForm = (evento: React.FormEvent<HTMLElement>) => {
    evento.preventDefault()
    const formData = new FormData();

    formData.append('nome',pratosNome)    
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante',restaurante)
    

    if(imagem){
      formData.append('imagem',imagem)
    }

    http.request({
      url:'pratos/',
      method: 'POST',
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
    .then(() =>
   
    alert('Prato cadastrado com sucesso!'))
    .catch(erro => console.log(erro))
  }

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>)=>{
    if(evento.target.files?.length){
      setImagem(evento.target.files[0])
    }else{
      setImagem(null)
    }
  }

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
      <Typography component='h1' variant="h6">Cadastro de Pratos</Typography>
      <Box component={'form'} sx={{ width: '100%' }} onSubmit={onSubmitForm}>
        <TextField value={pratosNome}
          onChange={evento => setPratosNome(evento.target.value)}          
          label="Nome do Prato:"
          variant="standard"
          fullWidth
          required
          margin="dense" />

          <TextField value={descricao}
          onChange={evento => setDescricao(evento.target.value)}          
          label="Descrição:"
          variant="standard"
          fullWidth
          required
          margin="dense" />

          <FormControl margin="dense" fullWidth>
            <InputLabel id='select-tag'>Tag</InputLabel>
            <Select labelId='select-tag' value={tag} onChange={evento => setTag(evento.target.value)}>
              {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>)}
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel id='select-restaurante'>Restaurantes</InputLabel>
            <Select labelId='select-restaurante' value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
              {restaurantes.map(res => <MenuItem key={res.id} value={res.id}>
                {res.nome}
              </MenuItem>)}
            </Select>
          </FormControl>

          <input type="file" onChange={selecionarArquivo}/>
        <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
      </Box>
    </Box>

  )
}
export default FormularioPratos;