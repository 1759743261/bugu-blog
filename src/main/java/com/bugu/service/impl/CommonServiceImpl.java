package com.bugu.service.impl;

import com.bugu.service.CommonService;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Random;

@Service
public class CommonServiceImpl implements CommonService {

    @Override
    public HashMap<String, Object> getCodeImg() {
        // 1. 创建一个指定宽度、高度的图片，背景颜色是黑色【可以i理解成一个大大的画板】
        int width = 300, height = 150;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        // 2. 根据图片对象创建一个画刷【根据画板创建一个对应的画笔】
        Graphics graphics = image.getGraphics();

        // 3. 设置颜色【画笔蘸颜料】
        graphics.setColor(new Color(230, 230, 230));

        // 4. 在图片中指定范围内填充一个矩形
        graphics.fillRect(1, 1, width - 1, height - 1);

        // 5. 设置颜色【画笔蘸颜料】
        graphics.setColor(new Color(230, 230, 230));

        // 6. 在图片中指定范围画一个矩形【变相的画边框】
        graphics.drawRect(0, 0, width - 1, height - 1);

        // 7. 设置字体
        graphics.setFont(new Font("Times New Roman", Font.PLAIN, 64));

        // 8. 设置颜色
        graphics.setColor(new Color(144, 147, 153));
        graphics.setColor(new Color(0, 0, 0));

        // 9. 写字
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            char ch = (char) (random.nextInt(26) + 65);
            code.append(ch);
            graphics.drawString(String.valueOf(ch), 35 + i * 60, 95);
//            code.append(1+i);
//            graphics.drawString(String.valueOf(1+i), 35 + i * 60, 95);
        }

        // 10. 释放当前画刷
        graphics.dispose();

        // 创建输出流
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        // 写入流中
        try {
            ImageIO.write(image, "png", baos);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 转换成字节数组
        byte[] bytes = baos.toByteArray();

        // 转换成base64串【该方式转换成的base64编码自带 "\r\n" ，需要自己后期处理】
        String pngBase64 = new BASE64Encoder().encodeBuffer(bytes).trim();

        // 删除 \r\n
        pngBase64 = pngBase64.replaceAll("\n", "").replaceAll("\r", "");

        // 结果
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("codeNum", new String(code));
        hashMap.put("codeBase64", pngBase64);

        return hashMap;
    }

}
