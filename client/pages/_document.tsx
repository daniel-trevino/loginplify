import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

interface Props {
  styleTags: any
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) =>
          sheet.collectStyles(<App {...props} />)
      })

    const initialProps: any = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [...initialProps.styles, ...sheet.getStyleElement()]
    }
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
