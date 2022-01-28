import React from 'react'
import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import appConfig from '../config.json'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMzMzczMywiZXhwIjoxOTU4OTA5NzMzfQ.JAAqdhEiLw4StrWMhZlWudFDegQdevV0mgHtawTxT58'
const SUPABASE_URL = 'https://zqhlmlywmrzfkqxvhwxy.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function ChatPage() {
    const roteamento = useRouter()
    const usuarioLogado = roteamento.query.username
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagens, setListaDeMensagens] = React.useState([])

    React.useEffect(() => {
        const supabaseDados = supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false})
            .then((data) => {
                //console.log('Dados da consulta: ', dados)
                setListaDeMensagens(data.data)
            })
    }, [])

    

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            user: usuarioLogado,
            text: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([mensagem])
            .then(({ data }) => {
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens
                ])
            })

        {/* setListaDeMensagens([
            mensagem,
            ...listaDeMensagens,
        ]);
        setMensagem(''); */}
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.palette['06'],
                //backgroundImage:'linear-gradient(45deg, #ede0d4, #fff)',
                backgroundImage: 'url(https://images2.imgbox.com/d4/b1/WceS1Cbm_o.png)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                backgroundPosition:'center',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    //boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    /*backgroundColor: appConfig.theme.colors.neutrals[700],*/
                    backgroundColor: appConfig.theme.colors.palette['05'],
                    height: '100%',
                    maxWidth: '900px',
                    maxHeight: '96vh',
                    padding: '10px',
                    position:'relative'
                }}
            >

                <Header />

                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(e) => {
                                const valor = e.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Escreva aqui"
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                minHeight: '70px',
                                border: '0',
                                resize: 'none',
                                float: 'left',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginTop: '10px',
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <Button
                            styleSheet={{
                                width:'140px',
                                height:'70px',
                                backgroundColor:'#00C9A1',
                                color:'#fff',
                                fontSize:'18px',
                                fontWeight:'bold',
                                float:'right',
                                border:'0',
                                borderRadius:'4px',
                                hover: {
                                    backgroundColor:'#14DBB3',
                                },
                                active: {
                                    backgroundColor:'#00B38F',
                                }
                                
                            }}
                            label='Enviar'
                            onClick={(e) => {
                                e.preventDefault();
                                if(mensagem !== ''){
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                        >
                        </Button>
                    </Box>

                    
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                {/* <Text variant='heading5'>
                    Chat
                </Text> */}

                <Box
                    styleSheet={{
                        width:'160px',
                        height:'60px',
                        backgroundImage:'url(https://i.ibb.co/4VT6rJx/capybara-2-j.png)',
                        backgroundSize:'cover',
                        backgroundRepeat:'no-repeat',
                        zIndex:'300',
                        position:'relative',
                        bottom:'-16px',
                        left:'50%',
                        transform:'translateX(-50%)'
                    }}
                >
                </Box>

                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginTop:'10px',
                marginBottom: '16px',
                
                  
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            },
                            marginRight:'5px'
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '26x',
                                    height: '26px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.user}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.user}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.text}
                    </Text>
                );
            })}
        </Box>
    )
}