import React from 'react'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router'
import appConfig from '../config.json';


function Titulo(props) {
  const Tag = props.tag || 'h1'
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.palette['07']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}


export default function PaginaInicial() {
  /*const username = 'jonatasgs7'
  let userImage = `https://github.com/${username}.png`
  if(username === ''){ userImage = `https://i.ibb.co/hVMtKZF/user-blank-capybara-j.png` }*/

  

  const [username, setUsername] = React.useState('')
  const roteamento = useRouter()

  let userImage = `https://github.com/${username}.png`
  if(userImage == '404' || username.length < 2){ userImage = `https://i.ibb.co/hVMtKZF/user-blank-capybara-j.png` }

  return (
    <>
      {/* All */}
      <Box styleSheet={{
          display:{lg:'flex', md:'display'}, width:'100%'
      }}>
          
        {/* Half - Content Form */}
        <Box styleSheet={{
            width: {lg:'50%', md:'100%'}, height: {lg:'100%', md:'auto'}, backgroundColor:'#fff', backgroundImage:'linear-gradient(45deg, #ede0d4, #fff)', display:'flex', alignItems:'center', justifyContent:'center', 
        }}>

            {/* Box Form */}
            <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault()
              if(username.length >= 2){ roteamento.push('/chat') }
            }}
            styleSheet={{
                width:'100%', maxWidth:{lg:'600px', md:'100%',sm:'100%'}, borderRadius:{md:'5px',sm:'0',xs:'0'}, padding:'28px', backdropFilter:'blur(5px)', margin:{lg:'20px', md:'0',sm:'0'}, background:'rgba(255,255,255,0.3)'
            }}>

                {/* Imagem and github name */}
              
                <Box styleSheet={{width:'100%', margin:'0 0 15px', display:'flex', alignItems:'center'}}>
                    <Image
                        styleSheet={{borderRadius:'50%', maxWidth:'60px', marginRight:'15px'}}
                        src={userImage}
                        alt={`Imagem de perfil do Github`}
                    />
                    <Text tag="p" styleSheet={{color:appConfig.theme.colors.palette['07'], margin:'0', fontSize:'22px', fontWeight:'normal'}}>{username}</Text>
                </Box>
                
                        
                {/* Titles */}
                <Titulo tag="h1">Bem-vindo ao CapybaraChat</Titulo>
                
                <Text variant="body3" styleSheet={{ color:appConfig.theme.colors.palette['01'] }}>
                {`${appConfig.name}`}
                </Text>

                {/* Form */}
                <TextField
                placeholder='Insira seu nome no chat'
                value={username}
                onChange={(e) => {
                  const valor = e.target.value
                  setUsername(valor)
                }}
                styleSheet={{
                    background:'transparent', border:'0', borderBottom:'1px solid #444', borderRadius:'0', marginTop:'30px', color:appConfig.theme.colors.palette['07'], textIndent:'0', paddingLeft:'0'
                }}
                
                />
                <Button type='submit' label='Entrar' fullWidth
                buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["000"],
                    mainColor: appConfig.theme.colors.primary[500],
                    mainColorLight: appConfig.theme.colors.primary[400],
                    mainColorStrong: appConfig.theme.colors.primary[600],
                }}
                styleSheet={{borderRadius:'0'}}
                />
                  
            </Box>

        </Box>

        {/* Half - Photo */}
        <Box styleSheet={{
            width: {lg:'50%', md:'100%', sm:'100%'}, height:{md:'100%',sm:'50%',xs:'50%'}, backgroundColor:'#444', backgroundImage:'url(https://i.ibb.co/Qmw02B9/capybara-main-j.png)', backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center', position:'relative'
        }}>
            <Box styleSheet={{width:'85px', height:'74px', backgroundImage:'url(https://i.ibb.co/dtPMctH/dialog-lets-talk-j.png)', backgroundSize:'100%', backgroundRepeat:'no-repeat', position:'absolute', top:'50%', left:'-40px', display:{lg:'block', md:'none', sm:'none', xs:'none'}, transform:'translateY(-50%)'}}></Box>
        </Box>

        <Box tag="footer"
            styleSheet={{position:{lg:'absolute', md:'relative'}, left:{lg:'10px', md:'auto'}, bottom:{lg:'10px', md:'auto'}, color:'#444', fontSize:'12px', textAlign:'center', padding:'15px'}}>
            Projeto desenvolvido para a Imersão Alura - 2022 - Por <a href="https://github.com/jonatasgs7" target="_blank">Jonatas Gaspar</a>
        </Box>
      
      </Box>

    </>
  );
}