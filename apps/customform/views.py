from django.forms import modelformset_factory
from django.views.generic import ListView, TemplateView

from apps.customform.forms import BaseModelForm, BaseAnswerForm, BaseFieldForm
from apps.customform.models import BaseFormModel, BaseFieldModel, BaseAnswerModel


class FormListView(ListView):
    model = BaseFormModel
    queryset = BaseFormModel.objects.get_recent()
    if queryset.count() > 3:
        queryset = queryset[:3]
    context_object_name = "recent_forms"
    template_name = "core/base_forms.html"


class AddElementView(TemplateView):

    template_name = 'form/editor.html'

    field_set = modelformset_factory(
        BaseFieldModel,
        fields=('name', 'type'),
        form=BaseFieldForm, extra=1,)

    answers = modelformset_factory(
        BaseAnswerModel,
        fields=('answer',),
        form=BaseAnswerForm, extra=1,)

    def get(self, *args, **kwargs):
        fields = self.field_set(
            queryset=BaseFieldModel.objects.none(),)
        answers = self.answers(
            queryset=BaseAnswerModel.objects.none(),)
        form = BaseModelForm()
        return self.render_to_response(
            {
                'form': form,
                'fieldset': fields,
                'answers': answers
            })

    # def post(self, *args, **kwargs):
    #     data = self.request.POST
    #     formset = BaseModelForm(data=data)
    #     if formset.is_valid():
    #         formset.save(commit=False)
    #     return self.render_to_response()









