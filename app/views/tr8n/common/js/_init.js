VKI_default_layout = '<%=Tr8n::KeyboardMapping.current_1_49%>';
Tr8n.host = '<%="#{uri.scheme}://#{uri.host}#{uri.port ? ":#{uri.port}" : ''}" %>';
Tr8n.source = '<%=source.html_safe %>';
Tr8n.locale = '<%=Tr8n::Config.current_language.locale%>'
<% if Tr8n::Config.enable_google_suggestions? and Tr8n::Config.current_user_is_translator? %>
Tr8n.google_api_key = '<%=Tr8n::Config.google_api_key%>';
<% end %>

<% 
  if Tr8n::Config.enable_keyboard_shortcuts? 
    Tr8n::Config.default_shortcuts.each do |key, data|       
%>    
shortcut.add('<%=key%>', function() {
  <%=data['script'].html_safe%>
});
<%     
    end
  end
%>

Tr8n.SDK.Proxy.init(<%=opts.to_json.html_safe %>);
Tr8n.SDK.Proxy.registerTranslationKeys(<%=translations.to_json.html_safe%>);

if ( Tr8n.SDK.Proxy.text_enabled ) {
  Tr8n.log("Parsing text...");
  Tr8n.SDK.Proxy.initText();
} else if ( Tr8n.SDK.Proxy.tml_enabled ) {
  Tr8n.log("Parsing tml...");
  Tr8n.SDK.Proxy.initTml();
}

