package com.bugu.utils;

/**
 * @Description: Description
 * @author: BuGu
 * @eamil: 1759743261@qq.com
 * @date: 2022.12.12 16:59
 */
public class PoetryUtil {
    public static String getRandomPoetry() {

        //单词短语

        String[] wordListOne = {"孤独", "自由", "迷惘", "坚强", "绝望", "青春",

                "迷茫", "光明", "理想", "荒谬"};

        String[] wordListTwo = {"生命", "路", "夜", "天空", "星空",

                "孩子", "雨", "石头", "鸟", "瞬间",

                "桥"};

        String[] wordListX = {"正在", "已经", "一直", "无法"};

        String[] wordListThree = {"爱着", "碎灭", "哭泣", "死去", "飞翔",

                "梦想", "祈祷", "离去", "再见", "埋葬"};


        //计算每组有多少个术语

        int oneLength = wordListOne.length;

        int twoLength = wordListTwo.length;

        int threeLength = wordListThree.length;

        int xLength = wordListX.length;


        String phrase = "";
        for (int i = 0; i < 4; i++) {

            int rand1 = (int) (Math.random() * oneLength);

            int rand2 = (int) (Math.random() * twoLength);

            int rand3 = (int) (Math.random() * threeLength);

            int randx = (int) (Math.random() * xLength);

            phrase = wordListOne[rand1] + "的"
                    + wordListTwo[rand2] + wordListX[randx]
                    + wordListThree[rand3];

        }
        return phrase;
    }
}