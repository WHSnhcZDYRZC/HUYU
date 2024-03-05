package com.huyu;

import com.huy.fileStarter.service.FileStorageService;
import com.huyu.system.SystemApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.io.*;
import java.net.URLConnection;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Set;

@SpringBootTest(classes = SystemApplication.class)
@RunWith(SpringRunner.class)
public class SystemApplicationTest {

    @Autowired
    RedisTemplate<String, String> redisTemplate;

    @Value("${file.redisTarget}")
    private String redisTarget;

    @Autowired
    FileStorageService fileStorageService;


    @Test
    public void testRedisTem() {
//        String s = redisTemplate.opsForValue().get("bigFileSlice:ba87954a269d30db7cb949f11ea6fee0:00527091e725ff8ffdf49eb99ac7ace6");

//        Set<String> keys = redisTemplate.keys("bigFileSlice:ba87954a269d30db7cb949f11ea6fee0:*");
//
////        System.out.println("====>" + s);
//
//        for (String key : keys) {
//            System.out.println(key);
//        }

        Set<String> keys = redisTemplate.keys(redisTarget + ":" + 1 + ":" + "a63f5b96886f09521b5ebda2fe50af95" + "*");

        System.out.println(keys.size());
    }

    @Test
    public void sumHash() {
        String filePath = "C:\\Users\\huy\\Desktop\\头像.jpg"; // 替换为实际文件路径

        System.out.println(filePath);
        try {
            String md5Hash = calculateFileMD5(filePath);
            System.out.println("MD5 Hash: " + md5Hash);
        } catch (IOException | NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void readFile() {
        String _filePath = "C:\\Users\\huy\\Desktop\\upload\\DaBaiCai_v6.0_2306.zip";

        try {
            RandomAccessFile raf = new RandomAccessFile(_filePath, "r");
            FileChannel channel = raf.getChannel();
            InputStream inputStream = Channels.newInputStream(channel);

            Path filePath = Paths.get(_filePath);

            // 获取文件名
            Path fileName = filePath.getFileName();
            String contentType = Files.probeContentType(filePath);

            System.out.println(fileStorageService.updateFile(String.valueOf(fileName), inputStream, contentType));

            raf.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Autowired
    RedissonClient redissonClient;

    @Test
    public void testRedisson() {
        RLock rLock = redissonClient.getLock("FILE_KEY");
        rLock.lock();

        try {
            System.out.println("加锁成功，执行后续代码。线程 ID：" + Thread.currentThread().getId());
            Thread.sleep(10000);
        } catch (Exception e) {
            //TODO
        } finally {
            rLock.unlock();
            // 3.解锁
            System.out.println("Finally，释放锁成功。线程 ID：" + Thread.currentThread().getId());
        }
    }

    public static String calculateFileMD5(String filePath) throws IOException, NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        try (FileInputStream fis = new FileInputStream(filePath);
             DigestInputStream dis = new DigestInputStream(fis, md)) {

            byte[] buffer = new byte[8192];
            while (dis.read(buffer) != -1) {
                // 通过 DigestInputStream 读取文件内容并更新消息摘要
            }
        }

        byte[] hashBytes = md.digest();

        // 将字节数组转换为十六进制字符串
        StringBuilder hexStringBuilder = new StringBuilder();
        for (byte b : hashBytes) {
            hexStringBuilder.append(String.format("%02x", b));
        }

        return hexStringBuilder.toString();
    }

    @Test
    public void testStr() {
        String str = "编程的本质是通过一系列指令和算法来指导计算机执行特定任务的过程。它涉及将问题分解成可执行的步骤，设计并实现解决方案，然后将其转化为计算机可以理解和执行的代码。编程的核心在于解决问题、实现功能和创造价值。它需要逻辑思维、创造力和持续的学习，同时还需要对计算机科学和编程语言等技术领域有深入的理解。在实践中，编程通常涉及调试、优化和不断改进代码，以确保其正确性、效率和可维护性。";

        String[] strArr = str.split("");

        for (String s : strArr) {
            System.out.println(s);
        }
    }
}
