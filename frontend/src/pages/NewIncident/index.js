import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Input, TextArea, CurrencyInput } from '../../components/Input'
import { FiArrowLeft } from 'react-icons/fi'
import { Container, Content } from './styles'
import { MdAddAPhoto } from 'react-icons/md'
import { AiOutlineLoading } from 'react-icons/ai'
import { Form } from '@unform/web'
import { incidentRequest } from '../../store/modules/incident/actions'
import * as Yup from 'yup'

import api from '../../services/api'

export default function NewIncident () {
  const formRef = useRef(null)
  const dispatch = useDispatch()
  const [fileField, setFileField] = useState(null)
  const [valueField, setValueField] = useState(null)
  const [url, setUrl] = useState(null)
  const loading = useSelector(state => state.incident.loading)

  const handleSubmit = async ({ file, title, description, value }) => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Campo obrigatório'),
        description: Yup.string().required('Campo obrigatório'),
        value: Yup.string(),
      })

      await schema.validate({ file, title, description, value }, {
        abortEarly: false
      })
    } catch (err) {
      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message
        })
        formRef.current.setErrors(validationErrors)
      }
    }
    dispatch(incidentRequest({ file: fileField, title, description, value: valueField }))
  }

  const handleChange = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', e.target.files[0])
    const response = await api.post('/files', data)
    setUrl(response.data.url)
    setFileField(response.data.id)
  }

  return (
    <Container>
      <Content>
        <section>
          <h1>Cadastrar novo evento</h1>
          <p>Descreva detalhes do evento.</p>

          <Link to="/profile">
            <FiArrowLeft size={15} color="#E02841" />
          Voltar para Eventos
          </Link>
        </section>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="file">
            {url !== null ? <img src={url} alt="file" /> : (
              <>
                <MdAddAPhoto size={60} color="#777"/>
                <strong>Adicione uma foto</strong>
              </>
            ) }

            <Input
              id="file"
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange} />
          </label>

          <Input
            placeholder="Título do caso"
            name="title"
          />

          <TextArea
            placeholder="Descrição"
            name="description"
          />

          <CurrencyInput
            name="value"
            onChange={ (event, value) => {
              setValueField(value)
            }}
          />

          <button type="submit">{loading ? <AiOutlineLoading /> : <strong>Cadastrar</strong>}</button>
        </Form>

      </Content>
    </Container>
  )
}
