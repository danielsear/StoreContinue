import './styles.css'

import deliveries from '../../assets/images/cross_country_motorcycle_icon.svg'
import card from '../../assets/images/credit_card_icon.svg'

function Footer() {
  return (
    <div className="footer_container">
      <section className="footer_body">
        <div className="deliveries">
          <img src={deliveries} alt="serviços de entrga" />
          <div>
            <p>
              <strong>Entrega com amigo mototáxi</strong>
              <br />A partir das 9 horas até as 17 horas
            </p>
          </div>
        </div>
        <div className="payment">
          <img src={card} alt="formas de pagamento" />
          <div>
            <p>
              <strong>Em até 3 vezes sem juros</strong>
              <br />
              no cartão de crédito
            </p>
          </div>
        </div>
      </section>
      <section className="footer_info">
        <p>
          Copyright ©2000 - 2021 www.KassinhaVariedades.com.br, TODOS OS
          DIREITOS RESERVADOS. Todo o conteúdo do site, todas as fotos, imagens,
          logotipos, marcas, dizeres, som, software, conjunto imagem, layout,
          trade dress, aqui veiculados são de propriedade exclusiva do
          proprietário, ou de seus parceiros. É vedada qualquer reprodução,
          total ou parcial, de qualquer elemento de identidade, sem expressa
          autorização. A violação de qualquer direito mencionado implicará na
          responsabilização cível e criminal nos termos da Lei. NS2.Com Internet
          S/A - CNPJ: 00.000.000/0000-00 - ENDEREÇO nº - CEP: - BAIRRO - CIDADE
          - ESTADO - A inclusão no carrinho não garante o preço e/ou a
          disponibilidade do produto. Caso os produtos apresentem divergências
          de valores, o preço válido é o exibido na tela de pagamento. Vendas
          sujeitas a análise e disponibilidade de estoque. Fale conosco:
          https://www.KassinhaVariedades.com.br/central-de-relacionamento
        </p>
      </section>
    </div>
  )
}

export default Footer
