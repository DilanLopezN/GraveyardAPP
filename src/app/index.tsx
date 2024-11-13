import { router } from 'expo-router'
import {
  Button,
  Center,
  FormControl,
  Image,
  Input,
  View,
  VStack
} from 'native-base'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import OssLogo from '../assets/images/osslogo.png'
import { Text } from 'react-native'
import Icons from '../constants/Icons'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/api'

// Definindo a interface para os dados do formulário
interface LoginFormInputs {
  email: string
  password: string
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>()

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState)
  }

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      // const response = await api.post('/auth/login', data)

      // const { access_token } = await response.data

      // console.log(access_token)
      router.replace('/(tabs)/')
    } catch (error) {
      console.log(JSON.stringify(error))
      alert('Falha ao realizar login!')
    }
  }
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/todos/1'
        )
        console.log('Conexão com API pública bem-sucedida:', response.data)
      } catch (error) {
        console.log('Erro na conexão com API pública:', error)
      }
    }
    testConnection()
  }, [])
  return (
    <SafeAreaView className="w-screen h-screen">
      <Center className="w-full h-full">
        <Image className="mt-20 mb-12" source={OssLogo} alt="OSS Logo" />
        <View className="flex flex-col w-[388px] h-[348px] rounded-lg shadow p-2 mx-4">
          <FormControl>
            <Text className="text-gray-800 font-bold text-xl m-4">
              Realizar login
            </Text>
            <VStack space="xs" className="mx-2">
              <Text className="text-red-800 font-semibold">Email:</Text>
              <Controller
                control={control}
                name="email"
                rules={{ required: 'Email é obrigatório' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="text-center w-full mx-2"
                    placeholder="Seu e-mail"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isInvalid={!!errors.email}
                  />
                )}
              />
              {errors.email && (
                <Text className="text-red-600">{errors.email.message}</Text>
              )}
              <Text className="text-red-800 font-semibold">Senha:</Text>
              <Controller
                control={control}
                name="password"
                rules={{ required: 'Senha é obrigatória' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="text-center w-full mx-2"
                    placeholder="Sua senha"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    type={showPassword ? 'text' : 'password'}
                    isInvalid={!!errors.password}
                    InputRightElement={
                      <Button
                        size="xs"
                        onPress={togglePasswordVisibility}
                        variant="unstyled"
                      >
                        {showPassword ? (
                          <Image className="w-6 h-6" source={Icons.eye} />
                        ) : (
                          <Image className="w-6 h-6" source={Icons.eyeHide} />
                        )}
                      </Button>
                    }
                  />
                )}
              />
              {errors.password && (
                <Text className="text-red-600">{errors.password.message}</Text>
              )}
              <Button
                size="md"
                className="mt-8 bg-red-600 p-2 transition-all text-white font-medium"
                style={{ backgroundColor: '#ef4444' }}
                onPress={handleSubmit(handleLogin)}
              >
                Entrar
              </Button>
            </VStack>
          </FormControl>
        </View>
      </Center>
    </SafeAreaView>
  )
}
