package com.bugu;

import org.commonmark.Extension;
import org.commonmark.ext.gfm.tables.TableBlock;
import org.commonmark.ext.gfm.tables.TablesExtension;
import org.commonmark.ext.heading.anchor.HeadingAnchorExtension;
import org.commonmark.node.Link;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.AttributeProvider;
import org.commonmark.renderer.html.AttributeProviderContext;
import org.commonmark.renderer.html.AttributeProviderFactory;
import org.commonmark.renderer.html.HtmlRenderer;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.FileReader;
import java.util.*;

@SpringBootTest
public class MarkdownToHTMLTest {

    /**
     &quot; 引号

     */

    @Test
    public static void main(String[] args) throws Exception {
        // 创建字符读入流
        String path = "C:\\Users\\Admin\\Desktop\\BuGuBlogDemo\\src\\main\\resources\\markdown.md";
        FileReader fileReader = new FileReader(path);

        // 按照字节数组的最大长度读取字节数据【返回读取到的字节数，如果读取到最后返回-1】
        char[] buff = new char[8];
        int len;
        StringBuilder sb = new StringBuilder();
        while ((len = fileReader.read(buff)) != -1) {
            sb.append(new String(buff, 0, len));
        }
        // 关闭流
        fileReader.close();

        String html = markdownToHtmlExtensions(sb.toString());
        System.out.println(html);
    }


    /**
     * markdown格式转换成HTML格式
     */
    public static String markdownToHtml(String markdown) {
        Parser parser = Parser.builder().build();
        Node document = parser.parse(markdown);
        HtmlRenderer renderer = HtmlRenderer.builder().build();
        return renderer.render(document);
    }


    /**
     * 增加扩展[标题锚点，表格生成]
     * Markdown转换成HTML
     */
    public static String markdownToHtmlExtensions(String markdown) {
        // h标题生成id
        Set<Extension> headingAnchorExtensions = Collections.singleton(HeadingAnchorExtension.create());
        // 转换table的HTML
        List<Extension> tableExtension = Arrays.asList(TablesExtension.create());
        Parser parser = Parser.builder()
                .extensions(tableExtension)
                .build();
        Node document = parser.parse(markdown);
        HtmlRenderer renderer = HtmlRenderer.builder()
                .extensions(headingAnchorExtensions)
                .extensions(tableExtension)
                .attributeProviderFactory(new AttributeProviderFactory() {
                    @Override
                    public AttributeProvider create(AttributeProviderContext context) {
                        return new CustomAttributeProvider();
                    }
                })
                .build();
        return renderer.render(document);
    }


    /**
     * 处理标签的属性
     */
    static class CustomAttributeProvider implements AttributeProvider {
        @Override
        public void setAttributes(Node node, String tagName, Map<String, String> attributes) {
            //改变a标签的target属性为_blank
            if (node instanceof Link) {
                attributes.put("target", "_blank");
            }
            if (node instanceof TableBlock) {
                attributes.put("class", "ui celled table");
            }
        }
    }

}
