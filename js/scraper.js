import axios from 'axios'
import { load } from 'cheerio'
import gbk from 'fast-gbk'

const { decode } = gbk()

async function getLinks(url) {
    // get baseUrl of url
    const Url = new URL(url)
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    const html = decode(res.data)
    const $ = load(html)
    const content = $('#chapterList')
    const links = content.find('a').map((i, element) => {
        return {
            href: `${Url.origin}${$(element).attr('href')}`,
            text: $(element).text()
        }
        // check if text match this pattern "Chapter any number"
        // if ($(element).text().match(/第\s\d+/)) {
        //     return {
        //         href: $(element).attr('href'),
        //         text: $(element).text()
        //     }
        // }
    }
    ).get()
    return links
    // 'text', 'href'

}

// const links = await getLinks('https://www.uukanshu.com/b/439/')
// console.log(links)

function cleanup(html) {

    // replace all <br> to \n
    const contentWithBr = html.replaceAll('<br>', '\n')
    // replace nbsp to space
    const contentWithSpace = contentWithBr.replaceAll('&nbsp;', ' ')
    // add space after p tags
    const contentWithSpaceP = contentWithSpace.replaceAll('</p>', "</p>\n\n")
    // remove all tags
    const contentWithoutTags = contentWithSpaceP.replace(/<\/?[^>]+(>|$)/g, "")

    const textBasic = contentWithoutTags.replace(
        /[\uff01-\uff5e]/g,
        function(ch) { return String.fromCharCode(ch.charCodeAt(0) - 0xfee0) }
    )

    const removedUseless = textBasic.replaceAll('UU看书 www.uukanshu.com', '')
    const removedUseless1 = removedUseless.replaceAll('UU看書 www.uukanshu.com', '')
    const removedUseless2 = removedUseless1.replaceAll('UU看書www.uukanshu.com', '')
    const removedUseless3 = removedUseless2.replaceAll('UU看书www.uukanshu.com', '')
    const addSpace = removedUseless3.replaceAll(',', ', ')
    const addSpace1 = addSpace.replaceAll(':', ': ')
    const replaceDot = addSpace1.replaceAll('。', '.')
    const replaceTripleDot = replaceDot.replaceAll('…', '.')

    const removeAds = replaceTripleDot.replaceAll('(adsbygoogle = window.adsbygoogle || []).push({});', '')

    // remove linebreak if its after a linebreak
    const removeLineBreak = removeAds.replaceAll('\n\n', '\n')

    // remove spaces and linebreaks at the beginning and end of the text
    const trim = removeLineBreak.trim()

    return trim
}

const getContent = async (url) => {
    const Url = new URL(url)
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    const html = decode(res.data)
    const $ = load(html)
    const nextLink = $('#next')
    const content = $('.uu_cont').html()

    const text = cleanup(content)
    return {
        content: text,
        nextLink: `${Url.origin}${nextLink.attr('href')}`
    }
}

// const content = await getContent('https://www.uukanshu.com/b/439/382388.html')
// console.log(content)