"use client"
import React, { useState } from 'react'
import { PiStudentFill, PiBookOpenTextFill, PiEyeFill, PiEyeSlashFill } from 'react-icons/pi'
import { RiAdminLine, RiLockPasswordLine } from 'react-icons/ri'
import { useAuth } from '@/contexts/auth'
import { login as loginApi } from '../services/authService'
import { Button } from '@/components/ui/button'
import { Input } from '@chakra-ui/react'
import { toaster } from '@/components/ui/toaster'
import { motion } from 'framer-motion'

const StartPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  // Define the event type explicitly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Define the event type explicitly
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { token } = await loginApi(formData)
      if (!token) {
        throw new Error('Token não encontrado')
      }
      localStorage.setItem('token', token)
      login(formData)

      toaster.create({
        type: 'success',
        title: 'Login realizado com sucesso!',
        description: 'Bem-vindo ao sistema.',
        duration: 5000,
        meta: { closable: true },
      })
    } catch (error) {
      let errorMessage = 'Ocorreu um erro durante o login'
      if (error instanceof Error) {
        errorMessage = error.message
      }

      toaster.create({
        type: 'error',
        title: 'Erro no login',
        description: errorMessage,
        duration: 5000,
        meta: { closable: true },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white/90 shadow-2xl"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
          <PiBookOpenTextFill className="mx-auto mb-3 h-12 w-12" />
          <h1 className="text-3xl font-bold">Patec</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* <div className="space-y-2">
            <label className="flex items-center font-medium text-gray-700">
              <RiLockPasswordLine className="mr-2" />
              Tipo de Acesso
            </label>
            <select
              name="userType"
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="student">Aluno</option>
              <option value="coordinator">Coordenador</option>
            </select>
          </div> */}

          <div className="space-y-2">
            <label className="block font-medium text-gray-700">E-mail</label>
            <div className="relative">
              <Input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-700"
                required
              />
              <PiStudentFill className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Senha</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 pr-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-700"
                required
              />
              <RiLockPasswordLine className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <PiEyeSlashFill className="h-5 w-5" /> : <PiEyeFill className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-6 text-lg text-white hover:opacity-90 disabled:opacity-50
              ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {formData.userType === 'student' ? (
              <>
                <PiStudentFill className="mr-2 h-5 w-5" />
                Entrar como Aluno
              </>
            ) : (
              <>
                <RiAdminLine className="mr-2 h-5 w-5" />
                Entrar como Coordenador
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export default StartPage
