package com.project.web.utils;

import java.util.HashSet;
import java.util.Set;

public final class SimilarStringUtil {
    private SimilarStringUtil() {}

    public static String normalize(String s) {
        if (s == null) return "";
        // (주), 공백/특수문자 제거 + 소문자
        String x = s.replace("(주)", "")
                    .replace("주식회사", "")
                    .toLowerCase()
                    .replaceAll("[^0-9a-z가-힣]", "");
        return x;
    }

    public static Set<String> bigrams(String s) {
        String x = normalize(s);
        Set<String> set = new HashSet<>();
        if (x.isEmpty()) return set;
        if (x.length() < 2) { set.add(x); return set; }
        for (int i = 0; i < x.length()-1; i++) {
            set.add(x.substring(i, i+2));
        }
        return set;
    }

    public static double jaccard(String a, String b) {
        Set<String> A = bigrams(a);
        Set<String> B = bigrams(b);
        if (A.isEmpty() && B.isEmpty()) return 1.0;
        if (A.isEmpty() || B.isEmpty())  return 0.0;
        Set<String> inter = new HashSet<>(A); inter.retainAll(B);
        Set<String> union = new HashSet<>(A); union.addAll(B);
        return union.isEmpty() ? 0.0 : (double) inter.size() / union.size();
    }
}
