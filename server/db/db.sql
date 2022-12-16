/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : xiaominggongchang

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 16/12/2022 21:09:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` char(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '员工编号',
  `uname` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '账号',
  `upwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '密码',
  `p_add` int(0) NULL DEFAULT NULL COMMENT '添加权限',
  `p_edit` int(0) NULL DEFAULT NULL COMMENT '修改权限',
  `p_delect` int(0) NULL DEFAULT NULL COMMENT '删除权限',
  `p_read` int(0) NULL DEFAULT NULL COMMENT '查看权限',
  `isshow` int(0) NOT NULL DEFAULT 1 COMMENT '1 显示 0隐藏',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1671077822301', 'admin', 'e10adc3949ba59abbe56e057f20f883ee10adc', 1, 1, 1, 1, 1);
INSERT INTO `admin` VALUES ('1671114380506', 'test', 'e10adc3949ba59abbe56e057f20f883ee10adc', 1, 0, 1, 1, 1);

-- ----------------------------
-- Table structure for attendance
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance`  (
  `eid` char(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '员工编号',
  `work_day` int(0) NULL DEFAULT NULL COMMENT '出勤天数',
  `total_day` int(0) NULL DEFAULT NULL COMMENT '本月实际天数',
  `over_day` int(0) NULL DEFAULT NULL COMMENT '加班天数',
  `piece_total` int(0) NULL DEFAULT NULL COMMENT '计件数',
  `score` int(0) NULL DEFAULT NULL COMMENT '绩效得分',
  `isshow` int(0) NULL DEFAULT 1,
  PRIMARY KEY (`eid`) USING BTREE,
  UNIQUE INDEX `eid`(`eid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attendance
-- ----------------------------
INSERT INTO `attendance` VALUES ('1670770979731', 24, 26, 5, 0, 80, 1);
INSERT INTO `attendance` VALUES ('1670771060270', 8, 26, 0, 0, 0, 1);
INSERT INTO `attendance` VALUES ('1671025267366', 26, 26, 26, 0, 100, 1);
INSERT INTO `attendance` VALUES ('1671025292242', 24, 26, 0, 0, 80, 1);
INSERT INTO `attendance` VALUES ('1671025323309', 20, 26, 0, 0, 50, 1);
INSERT INTO `attendance` VALUES ('1671025351659', 26, 26, 10, 20, 100, 1);

-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees`  (
  `eid` char(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '员工编号',
  `jid` char(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '岗位编号',
  `jlevel` char(2) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '岗位等级',
  `ename` char(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '员工姓名',
  `ebirth` char(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '出生日期',
  `egender` char(2) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '员工性别',
  `ephone` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '员工电话号码',
  `ecreate_time` char(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '入职时间',
  `isshow` int(0) NOT NULL DEFAULT 1 COMMENT '1 显示 0隐藏',
  PRIMARY KEY (`eid`) USING BTREE,
  UNIQUE INDEX `eid`(`eid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `employees` VALUES ('1670770979731', '1670766213272', '2', '小明', '2000-12-13', '男', '15759994566', '2022-12-11 23:02:59', 1);
INSERT INTO `employees` VALUES ('1670771060270', '1670768698588', '1', '马化腾', '1995-12-12', '男', '15862644703', '2022-12-11 23:04:20', 1);
INSERT INTO `employees` VALUES ('1671025267366', '1670766423912', '4', '马云', '1998-12-01', '男', '15759994566', '2022-12-14 21:41:07', 1);
INSERT INTO `employees` VALUES ('1671025292242', '1670766332771', '1', '王健林', '2001-12-12', '男', '15759994566', '2022-12-14 21:41:32', 1);
INSERT INTO `employees` VALUES ('1671025323309', '1670766475303', '3', '王思聪', '2003-12-16', '男', '15759994566', '2022-12-14 21:42:03', 1);
INSERT INTO `employees` VALUES ('1671025351659', '1670766273416', '4', '马斯克', '1995-001-06', '男', '15759994566', '2022-12-14 21:42:31', 1);

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs`  (
  `jid` char(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '岗位编号',
  `jname` char(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '岗位名称',
  `level_total` int(0) NULL DEFAULT NULL COMMENT '该岗位的总等级',
  `isshow` int(0) NULL DEFAULT 1 COMMENT '显示 1 隐藏 0',
  PRIMARY KEY (`jid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jobs
-- ----------------------------
INSERT INTO `jobs` VALUES ('1670766213272', '厂长', 10, 1);
INSERT INTO `jobs` VALUES ('1670766273416', '副厂长', 10, 1);
INSERT INTO `jobs` VALUES ('1670766332771', '部门主管', 10, 1);
INSERT INTO `jobs` VALUES ('1670766423912', '车间主任', 10, 1);
INSERT INTO `jobs` VALUES ('1670766450159', '工段长', 10, 1);
INSERT INTO `jobs` VALUES ('1670766475303', '班组长', 10, 1);
INSERT INTO `jobs` VALUES ('1670768698588', '普工', 10, 1);

-- ----------------------------
-- Table structure for salary
-- ----------------------------
DROP TABLE IF EXISTS `salary`;
CREATE TABLE `salary`  (
  `jid` char(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '岗位编号',
  `ebase_money` float(10, 2) NULL DEFAULT NULL COMMENT '基本工资',
  `jbase_money` float(10, 2) NULL DEFAULT NULL COMMENT '岗位基本工资',
  `perform_money` float(10, 2) NULL DEFAULT NULL COMMENT '绩效基本工资',
  `live_money` float(10, 2) NULL DEFAULT NULL COMMENT '生活津贴',
  `grow_money` float(10, 2) NULL DEFAULT NULL COMMENT '增幅工资',
  `isshow` int(0) NOT NULL DEFAULT 1 COMMENT '1 显示 0隐藏',
  PRIMARY KEY (`jid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of salary
-- ----------------------------
INSERT INTO `salary` VALUES ('1670766213272', 5000.00, 5000.00, 1000.00, 500.00, 500.00, 1);
INSERT INTO `salary` VALUES ('1670766273416', 4000.00, 4000.00, 1500.00, 1500.00, 600.00, 1);
INSERT INTO `salary` VALUES ('1670766332771', 3500.00, 2000.00, 1500.00, 1000.00, 500.00, 1);
INSERT INTO `salary` VALUES ('1670766423912', 3000.00, 2000.00, 1200.00, 1000.00, 300.00, 1);
INSERT INTO `salary` VALUES ('1670766450159', 3000.00, 2000.00, 1200.00, 1000.00, 300.00, 1);
INSERT INTO `salary` VALUES ('1670766475303', 3000.00, 2000.00, 1200.00, 1000.00, 300.00, 1);
INSERT INTO `salary` VALUES ('1670768698588', 2000.00, 1000.00, 500.00, 500.00, 100.00, 1);

SET FOREIGN_KEY_CHECKS = 1;
