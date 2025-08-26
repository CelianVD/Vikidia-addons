function scriptAjoutEbauche() {
  mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    $(function () {
      if (mw.config.get('wgAction') !== 'view') return;

      var pageTitle = mw.config.get('wgPageName').replace(/_/g, ' ');
      var api = new mw.Api();

      var bouton = $('<button>')
        .text('Ajouter ébauche')
        .css({
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px',
          background: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          zIndex: 9999
        });

      $('body').append(bouton);

      api.get({
        action: 'query',
        prop: 'revisions',
        titles: pageTitle,
        rvprop: 'content',
        formatversion: 2
      }).done(function (data) {
        if (!data.query || !data.query.pages[0].revisions) return;
        var content = data.query.pages[0].revisions[0].content;

        if (/\{\{ébauche\|/i.test(content)) {
          bouton.text('Bandeau déjà présent').css('background', '#6c757d').prop('disabled', true);
          return;
        }

        var match = content.match(/\{\{portail\|([^\}]+)\}\}/i);
        if (!match) {
          bouton.text('Aucun portail trouvé').css('background', '#6c757d').prop('disabled', true);
          return;
        }

        var portails = match[1].split('|');
        var ebaucheSyntax = '{{ébauche|' + portails.join('|') + '}}\n\n';
        var newContent = content.replace(/^(\{\{[^}]+\}}\n*)+/i, function (m) {
          return m + ebaucheSyntax;
        });

        bouton.click(function () {
          api.postWithEditToken({
            action: 'edit',
            title: pageTitle,
            text: newContent,
            summary: 'Ajout du bandeau ébauche'
          }).done(function () {
            alert('Bandeau ébauche ajouté ! Recharge la page pour le voir.');
          }).fail(function (error) {
            alert('Erreur : ' + error);
          });
        });
      });
    });
  });
}
