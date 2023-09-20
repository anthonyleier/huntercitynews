function Status(request, response) {
  response.status(200).json({'mensagem': 'deu boa mermão'})
}

export default Status;