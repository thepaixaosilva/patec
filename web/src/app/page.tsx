'use client'
import React, { useState } from 'react'
import { PiStudentFill, PiBookOpenTextFill, PiEyeFill, PiEyeSlashFill } from 'react-icons/pi'
import { RiAdminLine, RiLockPasswordLine } from 'react-icons/ri'
import { Button, Input } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/auth'
import { login as loginApi } from '../services/authService'
import { toaster } from '@/components/ui/toaster'

const StartPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, login, logout } = useAuth()

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { token } = await loginApi(formData)
      if (!token) {
        throw new Error('Token não encontrado')
      }
      localStorage.setItem('token', token)
      login(formData)

      toaster.success({
        title: 'Login realizado com sucesso!',
        description: 'Bem-vindo ao sistema.',
      })
    } catch (error) {
      let errorMessage = 'Ocorreu um erro durante o login'
      if (error instanceof Error) {
        errorMessage = error.message
      }

      toaster.error({
        title: 'Erro no login',
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white/90 shadow-2xl rounded-2xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
          <PiBookOpenTextFill className="mx-auto w-12 h-12 mb-3" />
          <h1 className="text-3xl font-bold">Patec</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <RiLockPasswordLine className="mr-2" />
              Tipo de Acesso
            </label>
            <select
              name="userType"
              // value={formData.userType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="student">Aluno</option>
              <option value="coordinator">Coordenador</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">E-mail</label>
            <div className="relative">
              <Input type="email" name="email" placeholder="Digite seu e-mail" value={formData.email} onChange={handleChange} pl="10" borderRadius="lg" required />
              <PiStudentFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Senha</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                pl="10"
                pr="12"
                borderRadius="lg"
                required
              />
              <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <PiEyeSlashFill className="w-5 h-5" /> : <PiEyeFill className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            w="full"
            bgGradient="linear(to-r, blue.600, purple.600)"
            color="white"
            borderRadius="xl"
            py="6"
            px="4"
            fontSize="lg"
            _hover={{ opacity: 0.9 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
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
