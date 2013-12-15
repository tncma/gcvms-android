package com.cma.gcvmsclient;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.webkit.WebView;
import android.webkit.WebViewClient;

@SuppressLint("SetJavaScriptEnabled")
public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		WebView webView=(WebView) findViewById(R.id.webView);

		webView.getSettings().setJavaScriptEnabled(true);

        webView.setWebViewClient(new WebViewClient()       
        {
             @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) 
            {

                //url="http://google.com";
                //view.loadUrl(url);
                System.out.println("hello");
                return true;
            }
        });
        //Toast.makeText(this, "", Toast.LENGTH_SHORT);
        webView.loadUrl("file:///android_asset/home.html");
    
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.activity_main, menu);
		return true;
	}

}
