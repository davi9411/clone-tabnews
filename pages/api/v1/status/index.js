function status(request, response) {
  response.status(200).json({
    chave: `são acima da média, mas não se preocupe, é normal em dias de verão!`,
  });
}
export default status;
