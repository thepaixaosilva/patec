'use client'
import React, { useState } from 'react'
import { PiStudentFill, PiBookOpenTextFill, PiEyeFill, PiEyeSlashFill } from 'react-icons/pi'
import { RiAdminLine, RiLockPasswordLine } from 'react-icons/ri'
import { useAuth } from '@/contexts/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

const StartPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const showToast = (type: 'success' | 'error', title: string, text: string) => {
    Swal.fire({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: type,
      title: title,
      text: text,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Previne o comportamento padrão de recarregar a página
    setIsLoading(true)

    try {
      const loginSuccessful = await login(formData)
      if (!loginSuccessful) {
        showToast('error', 'Erro no login', 'Credenciais inválidas')
      }
    } catch (error) {
      console.error('Erro durante o login:', error)
      showToast('error', 'Erro inesperado', 'Ocorreu um erro ao tentar fazer login.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
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
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">E-mail</label>
            <div className="relative">
              <Input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-700"
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
                required
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 pr-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-700"
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
            <RiAdminLine className="mr-2 h-5 w-5" />
            Entrar
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export default StartPage
